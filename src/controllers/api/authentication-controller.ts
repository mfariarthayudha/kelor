import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { setRole } from "../../..";

import validatorjs from "../../utilities/validatorjs";
import knex from "../../utilities/knex";

export const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await validatorjs(
      {
        username: request.body.username,
        password: request.body.password,
      },
      {
        username: "required|string",
        password: "required|string",
      }
    );

    const user = await knex("users")
      .where("username", request.body.username)
      .limit(1)
      .then((result) => {
        if (result.length < 1) {
          throw { code: "user-not-found" };
        }

        return result[0];
      });

    if (
      (await bcrypt.compare(request.body.password, user.password as string)) ==
      false
    ) {
      throw { code: "invalid-password" };
    }

    // @ts-ignore
    request.session.user = {
      userId: user.user_id,
      username: user.username,
      role: user.role,
    };
    setRole(user.role);
    return response.status(204).send();
  } catch (error: any) {
    switch (error.code) {
      case "validation-fails":
        return next({
          httpStatusCode: 400,
          responseBody: {
            code: "validation-fails",
            errorMessages: error.errorMessages,
          },
        });

      case "user-not-found":
        return next({
          httpStatusCode: 401,
          responseBody: { code: "user-not-found" },
        });

      case "invalid-password":
        return next({
          httpStatusCode: 401,
          responseBody: { code: "invalid-password" },
        });
    }
  }
};

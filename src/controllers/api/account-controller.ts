import { Request, Response } from "express";
import knex from "../../utilities/knex";
export const updateAccount = async (request: Request, response: Response) => {
  const update = await knex("users")
    .where("user_id", request.session.userId)
    .update({ name: request.body.name, role: request.body.role })
    .then((res) => {
      console.log("success update");
    });
};

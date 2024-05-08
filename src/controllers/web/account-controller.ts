import { Request, Response } from "express";
import knex from "../../utilities/knex";

export const account = async (request: Request, response: Response) => {
  const getUser = await knex("users")
    .where("user_id", request.session.user?.userId)
    .then((res) => {
      return res[0];
    });

  return response.render("pages/home/account", { user: getUser });
};

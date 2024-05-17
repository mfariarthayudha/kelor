import { Request, Response } from "express";
import knex from "../../utilities/knex";
import bufferSignature from "../../utilities/sendSignatureImage";
import moment from "moment";
moment().local();
moment.locale("id");

export const viewAccount = async (request: Request, response: Response) => {
  // const user = request.session.user;
  const user = await knex("users")
    .select(
      "users.email",
      "users.role",
      "village_chiefs.fullname",
      "village_chiefs.signature",
      "users.create_at",
      "users.update_at"
    )
    .where("user_id", request.session.user?.userId)
    .then((result: any) => {
      return result.map((user: any) => {
        return {
          ...user,
          create_at: moment(user.create_at).format("dddd, DD MMMM YYYY"),
          update_at: moment(user.update_at).format("dddd, DD MMMM YYYY"),
          signature: bufferSignature(user.signature),
        };
      });
    });

  return response.render("pages/data/edit/account", { user: user[0] });
};

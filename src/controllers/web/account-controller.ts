import { Request, Response } from "express";
import knex from "../../utilities/knex";
import bufferSignature from "../../utilities/sendSignatureImage";
import moment from "moment";
moment().local();
moment.locale("id");

export const viewAccount = async (request: Request, response: Response) => {
  const userId = request.session.user!.userId;
  const user = await knex("users")
    .select(
      "users.email",
      "users.role",
      "users.create_at",
      "users.update_at",
      "village_chiefs.full_name",
      "village_chiefs.signature"
    )
    .innerJoin(
      "village_chiefs",
      "users.village_chief_id",
      "village_chiefs.village_chief_id"
    )
    .where("user_id", userId)
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
  // console.log("user ", user[0]);
  return response.render("pages/data/edit/account", user[0]);
};

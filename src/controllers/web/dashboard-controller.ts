import { Request, Response } from "express";

import knex from "../../utilities/knex";

export const dashboard = async (request: Request, response: Response) => {
  const [dusunCount, rwCount, rtCount, residentCount, documentCount] =
    await Promise.all([
      knex("dusun").count("dusun_id as count"),
      knex("rw").count("rw_id as count"),
      knex("rt").count("rt_id as count"),
      knex("residents").count("nik as count"),
      knex("document_results").count("document_result_id as count"),
    ]);
  console.log(request.session.user);
  return response.render("pages/dashboard", {
    dusun: dusunCount[0]["count"],
    rt: rtCount[0]["count"],
    rw: rwCount[0]["count"],
    warga: residentCount[0]["count"],
    surat: documentCount[0]["count"],
  });
};

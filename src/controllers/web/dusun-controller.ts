import { Request, Response } from "express";
import knex from "../../utilities/knex";
import moment from "moment";
moment.locale("id");

function splitObj(obj: object) {
  const key = Object.keys(obj);
  return key;
}
export const getAllDusun = async (request: Request, response: Response) => {
  const dusun = await knex("dusun")
    .select(
      "dusun.dusun_id",
      "dusun.nama_dusun",
      "dusun.luas_wilayah",
      "dusun.jumlah_warga",
      "residents.nama"
    )
    .innerJoin("residents", "dusun.kepala_dusun_nik", "residents.nik");
  // console.log(dusun);
  return response.render("pages/data/index/list-dusun", { dusun: dusun });
};

export const dusunUpdate = async (request: Request, response: Response) => {
  const dusun_id = request.params.dusunId;
  const dusun = await knex("dusun")
    .select("dusun.*", "residents.nama as nama")
    .innerJoin("residents", "dusun.kepala_dusun_nik", "residents.nik")
    .where("dusun_id", dusun_id)
    .then((result: any) => {
      return result.map((dusun: any) => {
        return {
          ...dusun,
          update_at: moment(dusun.update_at).format("dddd, DD MMMM YYYY"),
        };
      });
    });

  return response.render("pages/data/edit/dusun", dusun[0]);
};

export const dusunAdd = (request: Request, response: Response) => {
  return response.render("pages/data/add/dusun");
};

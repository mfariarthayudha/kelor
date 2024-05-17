import { Request, Response } from "express";
import knex from "../../utilities/knex";
import moment from "moment";
moment().local();
moment.locale("id");

export const getAllRw = async (request: Request, response: Response) => {
  const rw = await knex("dusun")
    .select(
      "rw.rw_id",
      "rw.no_rw",
      "residents.nama as ketua_rw",
      "dusun.nama_dusun ",
      "rw.jumlah_keluarga",
      "rw.jumlah_warga",
      "rw.create_at"
    )
    .innerJoin("rw", "rw.dusun_id", "dusun.dusun_id")
    .innerJoin("residents", "rw.ketua_rw_nik", "residents.nik")
    .then((result: any) => {
      return result.map((rw: any) => {
        return {
          ...rw,
          create_at: moment(rw.create_at).format("DD MMMM YYYY"),
        };
      });
    });
  return response.render("pages/data/index/list-rw", { rw: rw });
};

export const addRw = (request: Request, response: Response) => {
  return response.render("pages/data/add/rw");
};

export const updateRw = async (request: Request, response: Response) => {
  const rw_id = request.params.rwId;

  const rw = await knex("rw")
    .select("rw.*", "residents.nama")
    .innerJoin("residents", "rw.ketua_rw_nik", "residents.nik")
    .where("rw_id", rw_id)
    .then((result: any) => {
      return result.map((rw: any) => {
        return {
          ...rw,
          update_at: moment(rw.update_at).format("dddd, DD MMMM YYYY"),
        };
      });
    });

  return response.render("pages/data/edit/rw", rw[0]);
};

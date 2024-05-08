import { Request, Response } from "express";
import knex from "../../utilities/knex";
import moment from "moment";
moment.locale("id");

export const getAllRt = async (request: Request, response: Response) => {
  const rt = await knex("rt")
    .select(
      "rt.rt_id",
      "rt.no_rt",
      "rw.no_rw",
      "dusun.nama_dusun",
      "residents.nama",
      "rt.jumlah_keluarga",
      "rt.jumlah_warga"
    )
    .innerJoin("rw", "rt.rw_id", "rw.rw_id")
    .innerJoin("dusun", "rw.dusun_id", "dusun.dusun_id")
    .innerJoin("residents", "rt.ketua_rt_nik", "residents.nik");
  return response.render("pages/data/index/list-rt", { rt: rt });
};

export const rtAdd = (request: Request, response: Response) => {
  return response.render("pages/data/add/rt");
};

export const rtUpdate = async (request: Request, response: Response) => {
  const rt_id = request.params.rtId;

  const rt = await knex("rt")
    .select(
      "rt.*",
      "rw.no_rw",
      "residents.nama as nama",
      "dusun.nama_dusun",
      "dusun.dusun_id"
    )
    .where("rt_id", rt_id)
    .innerJoin("rw", "rw.rw_id", "rt.rw_id")
    .innerJoin("dusun", "rw.dusun_id", "dusun.dusun_id")
    .innerJoin("residents", "rt.ketua_rt_nik", "residents.nik")
    .then((result: any) => {
      return result.map((rt: any) => {
        return {
          ...rt,
          update_at: moment(rt.update_at).format("dddd, DD MMMM YYYY"),
        };
      });
    });

  return response.render("pages/data/edit/rt", rt[0]);
};

export const tesAja = async (request: Request, response: Response) => {
  const res = await knex("tes").then((res) => {
    return res[0];
  });

  return response.render("document-template/tes", res.content);
};

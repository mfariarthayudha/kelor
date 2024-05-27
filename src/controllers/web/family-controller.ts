import { Request, Response } from "express";
import knex from "../../utilities/knex";
import { getIdAddressByNoKK } from "../../repository/family-repository";
import moment from "moment";
moment().local();
moment.locale("id");

export const familyAdd = (request: Request, response: Response) => {
  return response.render("pages/data/add/family");
};

export const familyUpdate = async (request: Request, response: Response) => {
  try {
    const no_kk = request.params.no_kk;
    const alamat = await getIdAddressByNoKK(no_kk);
    const additional = await knex("families")
      .select("kode_pos", "approved", "update_at")
      .where("no_kk", no_kk)
      .then((result: any) => {
        return result.map((family: any) => {
          return {
            ...family,
            update_at: moment(family.update_at).format("dddd, DD MMMM YYYY"),
          };
        });
      });
    const member = await knex("families_member")
      .select(
        "families_member.nik as nik",
        "families_member.status_keluarga as status_keluarga",
        "residents.nama as nama"
      )
      .innerJoin("residents", "families_member.nik", "residents.nik")
      .where("families_member.no_kk", no_kk);

    console.log(alamat);
    return response.render("pages/data/edit/family", {
      no_kk: no_kk,
      member: member,
      alamat: alamat,
      ...additional[0],
    });
  } catch (error) {
    return response.status(404).send({
      code: "internal-server-error",
      errorMessages: "Tidak dapat ditemukan",
    });
  }
};
export const getFamilyAll = async (request: Request, response: Response) => {
  const res = await knex("families")
    .select(
      "families.no_kk as no_kk",
      "families.alamat as alamat",
      "families.create_at as create_at",
      "dusun.nama_dusun as dusun",
      "rw.no_rw as rw",
      "rt.no_rt as rt"
    )
    .innerJoin("dusun", "families.dusun_id", "dusun.dusun_id")
    .innerJoin("rw", "families.rw_id", "rw.rw_id")
    .innerJoin("rt", "families.rt_id", "rt.rt_id")
    .then((result: any) => {
      return result.map((family: any) => {
        return {
          ...family,
          create_at: moment(family.create_at).format("DD MMMM YYYY"),
        };
      });
    });
  console.log(res);
  return response.render("pages/data/index/list-family", { family: res });
};

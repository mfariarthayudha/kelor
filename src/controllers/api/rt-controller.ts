import { Request, Response } from "express";
import knex from "../../utilities/knex";
import validatorjs from "../../utilities/validatorjs";
import moment from "moment";
import { getAddressByRtId } from "../../repository/rt-repository";
import { v4 as uuidV4 } from "uuid";
import { getName } from "../../repository/resident-repository";

moment().local();
moment.locale("id");

export const getRtName = async (request: Request, response: Response) => {
  try {
    const rwId = request.params.rwId;
    const rtNameAll = await knex("rt")
      .select("rt_id", "no_rt")
      .where("rw_id", rwId);
    return response.status(200).send(rtNameAll);
  } catch (error: any) {
    console.log(error?.code);

    switch (error?.code) {
      case undefined:
        return response.status(404).send({
          code: "not-found",
          errorMessages: "No RT tidak ditemukan",
        });
      default:
        return response.status(500).send({
          code: "internal-server-error",
          errorMessages: error,
        });
    }
  }
};

export const rtAdd = async (request: Request, response: Response) => {
  try {
    await validatorjs(
      {
        no_rt: request.body.no_rt,
        rw: request.body.rw,
        dusun: request.body.dusun,
        jumlah_keluarga: request.body.jumlah_keluarga,
        nik_ketua_rt: request.body.nik_ketua_rt,
        jumlah_warga: request.body.jumlah_warga,
      },
      {
        no_rt: "required|string|max:2",
        rw: "required|string|max:36",
        dusun: "required|string|max:36",
        jumlah_keluarga: "required|integer",
        nik_ketua_rt: "required|integer",
        jumlah_warga: "required|integer",
      }
    );

    const checkRt = await knex("rt")
      .select("rt_id")
      .where("rw_id", request.body.rw)
      .andWhereILike("no_rt", request.body.no_rt)
      .then((res) => {
        return res[0];
      });
    if (checkRt) {
      const dusun = await getAddressByRtId(checkRt.rt_id);

      return response.status(400).send({
        code: "400",
        errorMessages:
          "No RT sudah terdaftar pada " +
          dusun.nama_dusun +
          " No RW " +
          dusun.no_rw,
      });
    }
    const checkNik = await getName(request.body.nik_ketua_rt);

    if (checkNik === undefined) {
      return response.status(400).send({
        errorMessages: "NIK tidak terdaftar",
      });
    }
    const rtId = uuidV4();
    await knex("rt").insert({
      rt_id: rtId,
      no_rt: request.body.no_rt,
      rw_id: request.body.rw,
      jumlah_keluarga: request.body.jumlah_keluarga,
      keterangan: request.body.keterangan,
      jumlah_warga: request.body.jumlah_warga,
      ketua_rt_nik: request.body.nik_ketua_rt,
      create_at: moment().format("YYYY-MM-DD"),
      update_at: moment().format("YYYY-MM-DD"),
    });
    const res = await getAddressByRtId(rtId);

    return response.status(201).send(res);
  } catch (error: any) {
    switch (error?.code) {
      case "validation-fails":
        return response.status(400).send({
          code: "validation-fails",
          errorMessages: error.errorMessages,
        });

      default:
        return response.status(500).send({
          code: "internal-server-error",
          errorMessages: error,
        });
    }
  }
};

export const rtUpdate = async (request: Request, response: Response) => {
  try {
    const rt_id = request.params.rtId;

    await validatorjs(
      {
        rw: request.body.rw,
        jumlah_keluarga: request.body.jumlah_keluarga,
        nik_ketua_rt: request.body.nik_ketua_rt,
        jumlah_warga: request.body.jumlah_warga,
      },
      {
        rw: "required|string|max:36",
        jumlah_keluarga: "required|integer",
        nik_ketua_rt: "required|integer",
        jumlah_warga: "required|integer",
      }
    );

    const checkNik = await knex("residents")
      .select("nama")
      .where("nik", request.body.nik_ketua_rt)
      .then((res) => {
        return res[0];
      });
    if (checkNik === undefined) {
      return response.status(400).send({
        errorMessages: "NIK tidak terdaftar",
      });
    }
    const knexTransaction = await knex.transaction();

    try {
      await knex.transaction(async (trx) => {
        await knex("rt")
          .update({
            rw_id: request.body.rw,
            jumlah_keluarga: request.body.jumlah_keluarga,
            keterangan: request.body.keterangan,
            jumlah_warga: request.body.jumlah_warga,
            ketua_rt_nik: request.body.nik_ketua_rt,
            update_at: moment().format("YYYY-MM-DD"),
          })
          .where({ rt_id: rt_id })
          .transacting(trx)
          .then((res) => console.log("Sukses Update"));
      });
    } catch (error) {
      knexTransaction.rollback();
    }
    const res = await getAddressByRtId(rt_id);

    return response.status(200).send(res);
  } catch (error: any) {
    switch (error?.code) {
      case "validation-fails":
        return response.status(400).send({
          code: "validation-fails",
          errorMessages: error.errorMessages,
        });

      default:
        return response.status(500).send({
          code: "internal-server-error",
          errorMessages: error,
        });
    }
  }
};

export const rtRemove = async (request: Request, response: Response) => {
  try {
    const rt_id = request.params.rtId;

    const remove = await knex("rt").where("rt_id", rt_id).del();

    return response.status(200).send({ message: "Sukses Hapus RT" });
  } catch (error: any) {
    return response.status(500).send({
      code: "internal-server-error",
      errorMessages: error,
    });
  }
};

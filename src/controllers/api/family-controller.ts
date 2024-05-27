import { Request, Response, NextFunction } from "express";
import validatorjs from "../../utilities/validatorjs";
import knex from "../../utilities/knex";
import { deleteResident } from "../../repository/resident-repository";
import * as familyRepository from "../../repository/family-repository";
import moment from "moment";
import family from "../../interface/family";

moment().local();
moment.locale("id");

export const createFamily = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await validatorjs(
      {
        no_kk: request.body.no_kk,
        alamat: request.body.alamat,
        rt: request.body.rt,
        rw: request.body.rw,
        dusun: request.body.dusun,
      },
      {
        no_kk: "required|string|max:36",
        alamat: "required|string|max:36",
        rt: "required|string|max:36",
        rw: "required|string|max:36",
        dusun: "required|string|max:36",
      }
    );
    const checkNoKK = await knex("families")
      .select("no_kk")
      .where("no_kk", request.body.no_kk)
      .then((res) => {
        return res[0];
      });

    if (checkNoKK) {
      return response.status(400).send({
        errorMessages: "No KK " + checkNoKK.no_kk + " sudah terdaftar",
      });
    }
    const family: family = {
      no_kk: request.body.no_kk,
      alamat: request.body.alamat,
      rt: request.body.rt,
      rw: request.body.rw,
      dusun: request.body.dusun,
      kode_pos: request.body.kode_pos,
      create_at: new Date(moment().toDate()),
      update_at: new Date(moment().toDate()),
    };
    const res = await familyRepository.insertFamily(family);

    if (res) {
      return response.status(201).send({ no_kk: request.body.no_kk });
    }
  } catch (error: any) {
    switch (error?.code) {
      case "validation-fails":
        return next({
          httpStatusCode: 400,
          responseBody: {
            code: "validation-fails",
            errorMessages: error.errorMessages,
          },
        });

      default:
        return next({
          httpStatusCode: 500,
          responseBody: {
            code: "internal-server-error",
          },
        });
    }
  }
};

export const getFamily = async (request: Request, response: Response) => {
  try {
    const family = await knex("families").where({ no_kk: request.body.no_kk });
    return response.status(200).send(family[0]);
  } catch (error: any) {
    console.log(error?.code);

    switch (error?.code) {
      case "validation-fails":
        return response.status(400).send({
          code: "validation-fails",
          errorMessages: error.errorMessages,
        });
      case undefined:
        return response.status(404).send({
          code: "Tidak ditemukan",
          errorMessages: "No Kartu kelurga tidak ditemukan",
        });
      default:
        return response.status(500).send({
          code: "internal-server-error",
          errorMessages: error,
        });
    }
  }
};

export const getAddress = async (request: Request, response: Response) => {
  try {
    const no_kk = request.body.no_kk;
    const res = await familyRepository.getAddressByNoKK(no_kk);
    if (!res) {
      throw Error(undefined);
    }
    return response.status(200).send(res);
  } catch (error: any) {
    console.log(error?.code);

    switch (error?.code) {
      case "validation-fails":
        return response.status(400).send({
          code: "validation-fails",
          errorMessages: error.errorMessages,
        });
      case undefined:
        return response.status(404).send({
          code: "Tidak ditemukan",
          errorMessages: "No Kartu kelurga tidak ditemukan",
        });
      default:
        return response.status(500).send({
          code: "internal-server-error",
          errorMessages: error,
        });
    }
  }
};

export const updateFamily = async (request: Request, response: Response) => {
  // const trx = await knex.transaction();

  try {
    const no_kk = request.params.no_kk;

    await validatorjs(
      {
        alamat: request.body.alamat,
        rt: request.body.rt,
        rw: request.body.rw,
        dusun: request.body.dusun,
        kode_pos: request.body.kode_pos,
        approved: request.body.approved,
      },
      {
        alamat: "required|string|max:256",
        rt: "required|string|max:36",
        rw: "required|string|max:36",
        approved: "required|integer",
        kode_pos: "required|string|max:5",
        dusun: "required|string|max:36",
      }
    );

    await knex("families")
      .update({
        alamat: request.body.alamat,
        dusun_id: request.body.dusun,
        rw_id: request.body.rw,
        rt_id: request.body.rt,
        kode_pos: request.body.kode_pos,
        approved: request.body.approved,
        update_at: moment().format("YYYY-MM-DD"),
      })
      .where("no_kk", no_kk);
    // trx.commit();
    return response.status(200).send({ no_kk: no_kk });
  } catch (error: any) {
    // trx.rollback();
    console.log(error?.code);

    switch (error?.code) {
      case "validation-fails":
        return response.status(400).send({
          code: "validation-fails",
          errorMessages: error.errorMessages,
        });
      case undefined:
        return response.status(404).send({
          code: "Tidak ditemukan",
          errorMessages: "No Kartu kelurga tidak ditemukan",
        });
      default:
        return response.status(500).send({
          code: "internal-server-error",
          errorMessages: error,
        });
    }
  }
};

export const RemoveFamily = async (request: Request, response: Response) => {
  try {
    const no_kk = request.params.no_kk;
    await knex("families").where("no_kk", no_kk).del();

    const nik = await knex("families_member")
      .select("nik")
      .where("no_kk", no_kk)
      .then((res) => {
        return res[0];
      });
    if (nik) {
      await knex("families_member").where("no_kk").del();

      nik.map(async (nik: string) => {
        await deleteResident(nik);
      });
    }

    return response.status(200).send({ message: "Sukses hapus surat" });
  } catch (error: any) {
    switch (error.code) {
      case "no-kk-not-found":
        return response.status(400).send({
          code: "Tidak ditemukan",
          errorMessages: "Nomor Kartu Keluarga tidak ditemukan",
        });
      default:
        return response.status(500).send({
          code: "Error",
          errorMessages: error,
        });
    }
  }
};
export const getFamilyAddress = async (
  request: Request,
  response: Response
) => {
  try {
    const no_kk = request.params.nik;
    const res = await familyRepository.getAddressByNoKK(no_kk, true);
    return response.status(200).send(res);
  } catch (error: any) {
    console.log(error?.code);

    switch (error?.code) {
      case undefined:
        return response.status(404).send({
          code: "Tidak ditemukan",
          errorMessages: "Nik tidak ditemukan",
        });
      default:
        return response.status(500).send({
          code: "internal-server-error",
          errorMessages: error,
        });
    }
  }
};

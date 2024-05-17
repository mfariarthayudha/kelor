import { Request, Response } from "express";
import knex from "../../utilities/knex";
import moment from "moment";
import { v4 as uuidV4 } from "uuid";
import validatorjs from "../../utilities/validatorjs";
import { getName } from "../../repository/resident-repository";
moment().local();
moment.locale("id");

export const getDusunName = async (request: Request, response: Response) => {
  try {
    const res = await knex("dusun").select("dusun_id", "nama_dusun");

    return response.status(200).send(res);
  } catch (error: any) {
    console.log(error?.code);

    switch (error?.code) {
      case undefined:
        return response.status(404).send({
          code: "Tidak ditemukan",
          errorMessages: "Dusun tidak ditemukan",
        });
      default:
        return response.status(500).send({
          code: "internal-server-error",
          errorMessages: error,
        });
    }
  }
};
export const dusunAdd = async (request: Request, response: Response) => {
  try {
    await validatorjs(
      {
        nama_dusun: request.body.nama_dusun,
        kepala_dusun_nik: request.body.kepala_dusun_nik,
        jumlah_warga: request.body.jumlah_warga,
        luas_wilayah: request.body.luas_wilayah,
        keterangan: request.body.keterangan,
      },
      {
        nama_dusun: "required|string|max:128",
        kepala_dusun_nik: "required|integer",
        jumlah_warga: "required|integer",
        luas_wilayah: "required|integer",
        keterangan: "required|string|max:512",
      }
    );
    const checkDusun = await knex("Dusun")
      .select("nama_dusun")
      .where("nama_dusun", request.body.nama_dusun)
      .then((res) => {
        return res[0];
      });

    if (checkDusun) {
      return response.status(400).send({
        errorMessages: checkDusun.nama_dusun + " sudah terdaftar ",
      });
    }
    const checkNik = await getName(request.body.kepala_dusun_nik);
    if (checkNik === undefined) {
      return response.status(400).send({
        errorMessages: "NIK tidak terdaftar",
      });
    }
    const dusunId = uuidV4();

    await knex("dusun").insert({
      dusun_id: dusunId,
      nama_dusun: request.body.nama_dusun,
      kepala_dusun_nik: request.body.kepala_dusun_nik,
      luas_wilayah: request.body.luas_wilayah,
      jumlah_warga: request.body.jumlah_warga,
      keterangan: request.body.keterangan,
      create_at: moment().format("YYYY-MM-DD"),
      update_at: moment().format("YYYY-MM-DD"),
    });

    return response.status(201).send({ nama_dusun: request.body.nama_dusun });
  } catch (error: any) {
    //console.log(error);
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
export const dusunUpdate = async (request: Request, response: Response) => {
  try {
    const dusun_id = request.params.dusunId;
    await validatorjs(
      {
        nama_dusun: request.body.nama_dusun,
        kepala_dusun_nik: request.body.kepala_dusun_nik,
        jumlah_warga: request.body.jumlah_warga,
        luas_wilayah: request.body.luas_wilayah,
        keterangan: request.body.keterangan,
      },
      {
        nama_dusun: "required|string|max:128",
        kepala_dusun_nik: "required|integer",
        jumlah_warga: "required|integer",
        luas_wilayah: "required|integer",
        keterangan: "required|string|max:512",
      }
    );

    const checkNik = await knex("residents")
      .select("nama")
      .where("nik", request.body.kepala_dusun_nik)
      .then((res) => {
        return res[0];
      });
    if (checkNik === undefined) {
      return response.status(400).send({
        errorMessages: "NIK tidak terdaftar",
      });
    }

    try {
      await knex.transaction(async (trx) => {
        await knex("dusun")
          .where({ dusun_id: dusun_id })
          .update({
            nama_dusun: request.body.nama_dusun,
            kepala_dusun_nik: request.body.kepala_dusun_nik,
            luas_wilayah: request.body.luas_wilayah,
            jumlah_warga: request.body.jumlah_warga,
            keterangan: request.body.keterangan,
            update_at: moment().format("YYYY-MM-DD"),
          })
          .transacting(trx);
        await trx.commit();
        console.log("Sukses Update");
      });
    } catch (error) {
      // If any error occurs, rollback the transaction
      console.error("Error occurred, rolling back transaction:", error);
      // await trx.rollback(error);
    }

    return response.status(200).send({ nama_dusun: request.body.nama_dusun });
  } catch (error: any) {
    //console.log(error);
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

export const dusunRemove = async (request: Request, response: Response) => {
  try {
    const dusun_id = request.params.dusunId;
    const checkDusun = await knex("families")
      .select("no_kk")
      .where("dusun_id", dusun_id)
      .then((res) => {
        return res[0];
      });

    if (checkDusun) {
      return response.status(400).send({
        code: "Terdapat Foreign key",
        errorMessages: "Dusun masih ada pada salah satu keluarga",
      });
    }
    const remove = await knex("dusun").where("dusun_id", dusun_id).del();

    return response.status(200).send({ message: "Sukses Hapus dusun" });
  } catch (error: any) {
    //console.log(error);

    return response.status(500).send({
      code: "internal-server-error",
      errorMessages: error,
    });
  }
};

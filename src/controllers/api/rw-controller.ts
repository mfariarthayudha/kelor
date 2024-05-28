import { Request, Response } from "express";
import knex from "../../utilities/knex";
import validatorjs from "../../utilities/validatorjs";
import moment from "moment";
import { v4 as uuidV4 } from "uuid";
import { getName } from "../../repository/resident-repository";
moment().local();
moment.locale("id");

export const getRwName = async (request: Request, response: Response) => {
  try {
    const dusun_id = request.params.dusunId;
    const res = await knex("rw")
      .select("rw_id", "no_rw")
      .where("dusun_id", dusun_id);

    return response.status(200).send(res);
  } catch (error: any) {
    console.log(error?.code);

    switch (error?.code) {
      case undefined:
        return response.status(404).send({
          code: "not-found",
          errorMessages: "No RW tidak ditemukan",
        });
      default:
        return response.status(500).send({
          code: "internal-server-error",
          errorMessages: error,
        });
    }
  }
};

// export const checkNoRW = async (request: Request, response: Response) => {
//   try {
//     const { noRw, dusunId } = request.params;
//     const res = await knex("rw")
//       .select("no_rw")
//       .andWhereILike("no_rw", noRw)
//       .where("dusun_id", dusunId)
//       .then((res) => {
//         return res[0];
//       });

//     if (res) {
//       const dusun = await knex("dusun")
//         .select("nama_dusun")
//         .where("dusun_id", dusunId)
//         .then((res) => {
//           return res[0];
//         });
//       return response
//         .status(200)
//         .send({ no_rw: res.no_rw, dusun: dusun.nama_dusun });
//     } else if (res === undefined) {
//       return response.status(200).send({
//         rw: "No RW tidak ditemukan",
//       });
//     }
//   } catch (error: any) {
//     // console.log(error?.code);

//     switch (error?.code) {
//       default:
//         return response.status(500).send({
//           code: "internal-server-error",
//           errorMessages: error,
//         });
//     }
//   }
// };

export const createRw = async (request: Request, response: Response) => {
  try {
    await validatorjs(
      {
        no_rw: request.body.no_rw,
        dusun: request.body.dusun,
        jumlah_keluarga: request.body.jumlah_keluarga,
        nik_ketua_rw: request.body.nik_ketua_rw,
        jumlah_warga: request.body.jumlah_warga,
      },
      {
        no_rw: "required|string|max:2",
        dusun: "required|string|max:36",
        jumlah_keluarga: "required|integer",
        nik_ketua_rw: "required|integer",
        jumlah_warga: "required|integer",
      }
    );
    const checkRw = await knex("rw")
      .select("no_rw")
      .andWhereILike("no_rw", request.body.no_rw)
      .where("dusun_id", request.body.dusun)
      .then((res) => {
        return res[0];
      });

    if (checkRw) {
      const dusun = await knex("dusun")
        .select("nama_dusun")
        .where("dusun_id", request.body.dusun)
        .then((res) => {
          return res[0];
        });
      return response.status(400).send({
        errorMessages:
          "No RW " +
          checkRw.no_rw +
          " sudah terdaftar pada " +
          dusun.nama_dusun,
      });
    }
    const checkNik = await getName(request.body.nik_ketua_rw);

    if (checkNik === undefined) {
      return response.status(400).send({
        errorMessages: "NIK tidak terdaftar",
      });
    }
    const rwId = uuidV4();
    await knex("rw").insert({
      rw_id: rwId,
      no_rw: request.body.no_rw,
      dusun_id: request.body.dusun,
      jumlah_keluarga: request.body.jumlah_keluarga,
      keterangan: request.body.keterangan,
      jumlah_warga: request.body.jumlah_warga,
      ketua_rw_nik: request.body.nik_ketua_rw,
      create_at: moment().format("YYYY-MM-DD"),
      update_at: moment().format("YYYY-MM-DD"),
    });
    const res = await knex("dusun")
      .select("nama_dusun")
      .where("dusun_id", request.body.dusun)
      .then((res) => {
        return res[0];
      });

    return response
      .status(201)
      .send({ nama_dusun: res.nama_dusun, no_rw: request.body.no_rw });
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

export const rwUpdate = async (request: Request, response: Response) => {
  try {
    const rw_id = request.params.rwId;
    console.log("rw id ", rw_id);
    await validatorjs(
      {
        dusun: request.body.dusun,
        jumlah_keluarga: request.body.jumlah_keluarga,
        nik_ketua_rw: request.body.nik_ketua_rw,
        jumlah_warga: request.body.jumlah_warga,
      },
      {
        dusun: "required|string|max:36",
        jumlah_keluarga: "required|integer",
        nik_ketua_rw: "required|integer",
        jumlah_warga: "required|integer",
      }
    );
    // const checkRw = await knex("rw")
    //   .select("no_rw")
    //   .andWhereILike("no_rw", request.body.no_rw)
    //   .where("dusun_id", request.body.dusun)
    //   .then((res) => {
    //     return res[0];
    //   });

    const checkNik = await knex("residents")
      .select("nama")
      .where("nik", request.body.nik_ketua_rw)
      .then((res) => {
        return res[0];
      });
    if (checkNik === undefined) {
      return response.status(400).send({
        errorMessages: "NIK tidak terdaftar",
      });
    }

    await knex("rw")
      .update({
        dusun_id: request.body.dusun,
        jumlah_keluarga: request.body.jumlah_keluarga,
        keterangan: request.body.keterangan,
        jumlah_warga: request.body.jumlah_warga,
        ketua_rw_nik: request.body.nik_ketua_rw,
        update_at: moment().format("YYYY-MM-DD"),
      })
      .where({ rw_id: rw_id });
    console.log("Sukses Update");

    const res = await knex("dusun")
      .select("dusun.nama_dusun", "rw.no_rw")
      .innerJoin("rw", "dusun.dusun_id", "rw.dusun_id")
      .where("rw_id", rw_id)
      .then((res) => {
        return res[0];
      });

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

export const rwRemove = async (request: Request, response: Response) => {
  try {
    const rw_id = request.params.rwId;

    const remove = await knex("rw").where("rw_id", rw_id).del();

    return response.status(200).send({ message: "Sukses Hapus RW" });
  } catch (error: any) {
    return response.status(500).send({
      code: "internal-server-error",
      errorMessages: error,
    });
  }
};

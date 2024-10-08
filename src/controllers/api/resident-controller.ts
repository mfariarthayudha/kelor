import { Request, Response } from "express";

import validatorjs from "../../utilities/validatorjs";
import knex from "../../utilities/knex";
import moment from "moment";
import { convertEmptyStringsToNull } from "../../utilities/convert";
import * as residentRepository from "../../repository/resident-repository";
import {
  getAddressByNoKK,
  checkNoKK,
} from "../../repository/family-repository";
moment().local();
moment.locale("id");

export const addResident = async (request: Request, response: Response) => {
  try {
    await validatorjs(
      {
        no_kk: request.body.no_kk,
        nik: request.body.nik,
        nama: request.body.nama,
        tempat_lahir: request.body.tempat_lahir,
        tanggal_lahir: request.body.tanggal_lahir,
        jenis_kelamin: request.body.jenis_kelamin,
        pekerjaan: request.body.pekerjaan,
        agama: request.body.agama,
        status_pernikahan: request.body.status_pernikahan,
        pendidikan_terakhir: request.body.pendidikan_terakhir,
        nama_ayah: request.body.nama_ayah,
        nama_ibu: request.body.nama_ibu,
        nik_ayah: request.body.nik_ayah,
        nik_ibu: request.body.nik_ibu,
      },
      {
        no_kk: "required|string|max:36",
        nik: "required|string|max:36",
        nama: "required|string|max:128",
        tempat_lahir: "required|string|max:128",
        tanggal_lahir: "required|string|date",
        jenis_kelamin: "required|string|in:Laki-laki,Perempuan",
        pekerjaan: "required|string|max:128",
        agama: "required|string|in:Islam,Katolik,Kristen,Buddha,Hindu,Konghucu",
        status_pernikahan:
          "required|string|in:Cerai hidup,Cerai mati,Belum kawin,Kawin",
        pendidikan_terakhir: "required|string|max:50",
        nama_ayah: "required|string|max:36",
        nama_ibu: "required|string|max:36",
        nik_ayah: "required|string|max:36",
        nik_ibu: "required|string|max:36",
      }
    );
    const checkNik = await residentRepository.getName(request.body.nik);
    if (checkNik) {
      return response.status(400).send({
        errorMessages: "NIK " + request.body.nik + " sudah terdaftar",
      });
    }
    const checkKK = await checkNoKK(request.body.no_kk);
    if (!checkKK) {
      throw Error(undefined);
    }

    const obj = convertEmptyStringsToNull(request.body);
    const trx = await knex.transaction();

    try {
      await residentRepository.insertResident(obj, request.body.no_kk, trx);
      trx.commit();
      return response.status(201).send({ nama: request.body.nama });
    } catch (error) {
      await trx.rollback();
      throw new Error("gagal edit");
    }
  } catch (error: any) {
    switch (error?.code) {
      case "validation-fails":
        return response.status(400).send({
          code: "validation-fails",
          errorMessages: error.errorMessages,
        });
      case undefined:
        return response.status(404).send({
          code: "not-found",
          errorMessages: "NIK / NO KK tidak ditemukan",
        });
      default:
        return response.status(500).send({
          code: "internal-server-error",
          errorMessages: error,
        });
    }
  }
};

export const updateResident = async (request: Request, response: Response) => {
  const obj = convertEmptyStringsToNull(request.body);

  try {
    await validatorjs(
      {
        nik: request.body.nik,
        nama: request.body.nama,
        tempat_lahir: request.body.tempat_lahir,
        tanggal_lahir: request.body.tanggal_lahir,
        jenis_kelamin: request.body.jenis_kelamin,
        pekerjaan: request.body.pekerjaan,
        agama: request.body.agama,
        status_pernikahan: request.body.status_pernikahan,
        pendidikan_terakhir: request.body.pendidikan_terakhir,
        nama_ayah: request.body.nama_ayah,
        nama_ibu: request.body.nama_ibu,
        nik_ayah: request.body.nik_ayah,
        nik_ibu: request.body.nik_ibu,
      },
      {
        nik: "required|string|max:36",
        nama: "required|string|max:128",
        tempat_lahir: "required|string|max:128",
        tanggal_lahir: "required|string|date",
        jenis_kelamin: "required|string|in:Laki-laki,Perempuan",
        pekerjaan: "required|string|max:128",
        agama: "required|string|in:Islam,Katolik,Kristen,Buddha,Hindu,Konghucu",
        status_pernikahan:
          "required|string|in:Cerai hidup,Cerai mati,Belum kawin,Kawin",
        pendidikan_terakhir: "required|string|max:40",
        nama_ayah: "required|string|max:36",
        nama_ibu: "required|string|max:36",
        nik_ayah: "required|string|max:36",
        nik_ibu: "required|string|max:36",
      }
    );
    const checkKK = await checkNoKK(request.body.no_kk);
    if (!checkKK) {
      throw Error(undefined);
    }

    await knex("residents")
      .update({
        nama: obj.nama,
        alamat_sebelumnya: obj.alamat_sebelumnya,
        tempat_lahir: obj.tempat_lahir,
        tanggal_lahir: obj.tanggal_lahir,
        jenis_kelamin: obj.jenis_kelamin,
        agama: obj.agama,
        status_pernikahan: obj.status_pernikahan,
        pendidikan_terakhir: obj.pendidikan_terakhir,
        golongan_darah: obj.golongan_darah,
        pekerjaan: obj.pekerjaan,
        no_paspor: obj.no_paspor,
        tanggal_berakhir_paspor: obj.tanggal_berakhir_paspor,
        akta_lahir: obj.akta_lahir,
        no_akta_lahir: obj.no_akta_lahir,
        no_akta_nikah: obj.no_akta_nikah,
        akta_nikah: obj.akta_nikah,
        tanggal_perkawinan: obj.tanggal_perkawinan,
        no_akta_cerai: obj.no_akta_cerai,
        akta_cerai: obj.akta_cerai,
        tanggal_perceraian: obj.tanggal_perceraian,
        kelainan_fisik_mental: obj.kelainan_fisik_mental,
        penyandang_cacat: obj.penyandang_cacat,
        nama_ayah: obj.nama_ayah,
        nama_ibu: obj.nama_ibu,
        nik_ayah: obj.nik_ayah,
        nik_ibu: obj.nik_ibu,
        update_at: moment().format("YYYY-MM-DD"),
      })
      .where({ nik: request.params.nik });
    await knex("families_member")
      .update({
        status_keluarga: request.body.status_keluarga,
        no_kk: request.body.no_kk,
      })
      .where({ nik: request.params.nik });

    return response.status(201).send({ message: "Success update resident" });
  } catch (error: any) {
    switch (error?.code) {
      case "validation-fails":
        return response.status(400).send({
          code: "validation-fails",
          errorMessages: error.errorMessages,
        });
      case undefined:
        return response.status(404).send({
          code: "not-found",
          errorMessages: "NIK / NO KK tidak ditemukan",
        });
      default:
        return response.status(500).send({
          code: "internal-server-error",
          errorMessages: error,
        });
    }
  }
};

export const getResidentByNik = async (
  request: Request,
  response: Response
) => {
  try {
    await validatorjs(
      { nik: request.params.nik },
      { nik: "required|string|max:36" }
    );

    const member = await knex("families_member")
      .select("status_keluarga", "no_kk")
      .where("nik", request.params.nik)
      .then((res) => {
        return res[0];
      });

    const alamat = await getAddressByNoKK(member["no_kk"]);

    const resident = await residentRepository
      .getResidentMain(request.params.nik)
      .then((result: any) => {
        return result.map((resident: any) => {
          return {
            ...resident,
            tanggal_lahir: moment(resident.tanggal_lahir).format("yyyy-MM-DD"),
          };
        });
      });
    const res = {
      ...resident[0],
      ...alamat,
      status_keluarga: member.status_keluarga,
    };
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
          errorMessages: "Server Bermasalah",
        });
    }
  }
};

export const getResidentName = async (request: Request, response: Response) => {
  try {
    const nik = request.params.nik;
    const res = await residentRepository.getName(nik, true);
    return response.status(200).send(res);
  } catch (error: any) {
    console.log(error?.code);

    switch (error?.code) {
      case undefined:
        return response.status(404).send({
          code: "not-found",
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

export const residentRemove = async (request: Request, response: Response) => {
  try {
    const nik = request.params.nik;
    await residentRepository.deleteResident(nik);

    return response.status(200).send({ message: "Sukses Hapus " });
  } catch (error: any) {
    return response.status(500).send({
      code: "internal-server-error",
      errorMessages: error,
    });
  }
};

export const changeResidentFamily = async (
  request: Request,
  response: Response
) => {
  const nik = request.params.nik;
  const no_kk_new = request.body.no_kk;
  const status = request.body.status;
  const inFamily = await residentRepository.isResidentInFamily(nik);

  const checkNoKK = await knex("families")
    .select("no_kk")
    .where("no_kk", no_kk_new)
    .then((res) => {
      return res[0];
    });
  if (!checkNoKK) {
    return response.status(400).send({
      code: "not-found",
      errorMessages: "No KK Tidak Ditemukan",
    });
  }
  if (inFamily) {
    // Update existing family assignment
    await knex("families_member")
      .where("nik", nik)
      .update({ family_id: no_kk_new, status: status });
    return response.status(200).send({ message: "Sukses Mengubah" });
  } else {
    return response.status(400).send({
      code: "not-found",
      errorMessages: "NIK Tidak Ditemukan",
    });
  }
};

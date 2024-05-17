import knex from "../utilities/knex";
import resident from "../interface/resident";
import { Knex } from "knex";

export const getResidentMain = async (nik: string) => {
  const res = await knex("residents")
    .select(
      "nama",
      "tempat_lahir",
      "tanggal_lahir",
      "jenis_kelamin",
      "pekerjaan",
      "agama",
      "kewarganegaraan",
      "golongan_darah",
      "status_pernikahan"
    )
    .where("nik", nik);
  return res;
};

export const getName = async (nik: string) => {
  const res = await knex("residents").select("nama").where("nik", nik);
  return res[0];
};
export const getResidentFull = async (nik: string) => {
  return await knex("residents")
    .select("residents.*", "families_member.status_keluarga")
    .innerJoin("families_member", "residents.nik", "families_member.nik")
    .where("residents.  nik", nik);
};
export const insertResident = async (
  obj: resident,
  no_kk: string,
  trx: Knex.Transaction<any, any[]>
) => {
  // await knex.transaction(async (trx) => {
  await trx("residents").insert({
    nik: obj.nik,
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
    create_at: obj.create_at,
    update_at: obj.update_at,
  });
  await trx
    .insert({
      nik: obj.nik,
      status_keluarga: obj.status_keluarga,
      no_kk: no_kk,
    })
    .into("families_member");

  return "sukses";
  // });
};

export const deleteResident = async (nik: string) => {
  const remove = await knex("residents")
    .where("nik", nik)
    .del()
    .then((affectedRows) => {
      if (affectedRows < 1) {
        return new Error("no-kk-not-found");
      }
    });
  console.log("sukses hapus");
};
module.exports = {
  deleteResident,
  insertResident,
  getName,
  getResidentMain,
  getResidentFull,
};

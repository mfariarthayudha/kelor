"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResident = exports.insertResident = exports.getResidentFull = exports.getName = exports.getResidentMain = void 0;
const knex_1 = __importDefault(require("../utilities/knex"));
const getResidentMain = (nik) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, knex_1.default)("residents")
        .select("nama", "tempat_lahir", "tanggal_lahir", "jenis_kelamin", "pekerjaan", "agama", "kewarganegaraan", "golongan_darah", "status_pernikahan")
        .where("nik", nik);
    return res;
});
exports.getResidentMain = getResidentMain;
const getName = (nik) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, knex_1.default)("residents").select("nama").where("nik", nik);
    return res[0];
});
exports.getName = getName;
const getResidentFull = (nik) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)("residents")
        .select("residents.*", "families_member.status_keluarga")
        .innerJoin("families_member", "residents.nik", "families_member.nik")
        .where("residents.  nik", nik);
});
exports.getResidentFull = getResidentFull;
const insertResident = (obj, no_kk, trx) => __awaiter(void 0, void 0, void 0, function* () {
    // await knex.transaction(async (trx) => {
    yield trx("residents").insert({
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
    yield trx
        .insert({
        nik: obj.nik,
        status_keluarga: obj.status_keluarga,
        no_kk: no_kk,
    })
        .into("families_member");
    return "sukses";
    // });
});
exports.insertResident = insertResident;
const deleteResident = (nik) => __awaiter(void 0, void 0, void 0, function* () {
    const remove = yield (0, knex_1.default)("residents")
        .where("nik", nik)
        .del()
        .then((affectedRows) => {
        if (affectedRows < 1) {
            return new Error("no-kk-not-found");
        }
    });
    console.log("sukses hapus");
});
exports.deleteResident = deleteResident;
module.exports = {
    deleteResident: exports.deleteResident,
    insertResident: exports.insertResident,
    getName: exports.getName,
    getResidentMain: exports.getResidentMain,
    getResidentFull: exports.getResidentFull,
};

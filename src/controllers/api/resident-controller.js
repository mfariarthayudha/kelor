"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.residentRemove = exports.getResidentName = exports.getResidentByNik = exports.updateResident = exports.addResident = void 0;
const validatorjs_1 = __importDefault(require("../../utilities/validatorjs"));
const knex_1 = __importDefault(require("../../utilities/knex"));
const moment_1 = __importDefault(require("moment"));
const convert_1 = require("../../utilities/convert");
const residentRepository = __importStar(require("../../repository/resident-repository"));
const family_repository_1 = require("../../repository/family-repository");
moment_1.default.locale("id");
const addResident = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, validatorjs_1.default)({
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
        }, {
            no_kk: "required|string|max:36",
            nik: "required|string|max:36",
            nama: "required|string|max:128",
            tempat_lahir: "required|string|max:128",
            tanggal_lahir: "required|string|date",
            jenis_kelamin: "required|string|in:Laki-laki,Perempuan",
            pekerjaan: "required|string|max:128",
            agama: "required|string|in:Islam,Katolik,Kristen,Buddha,Hindu,Konghucu",
            status_pernikahan: "required|string|in:Cerai hidup,Cerai mati,Belum kawin,Kawin",
            pendidikan_terakhir: "required|string|max:50",
            nama_ayah: "required|string|max:36",
            nama_ibu: "required|string|max:36",
            nik_ayah: "required|string|max:36",
            nik_ibu: "required|string|max:36",
        });
        const checkNik = yield residentRepository.getName(request.body.nik);
        if (checkNik) {
            return response.status(400).send({
                errorMessages: "NIK " + request.body.nik + " sudah terdaftar",
            });
        }
        const obj = (0, convert_1.convertEmptyStringsToNull)(request.body);
        const trx = yield knex_1.default.transaction();
        try {
            yield residentRepository.insertResident(obj, request.body.no_kk, trx);
            trx.commit();
            return response.status(201).send({ nama: request.body.nama });
        }
        catch (error) {
            yield trx.rollback();
            throw new Error("gagal");
        }
    }
    catch (error) {
        //console.log(error);
        switch (error === null || error === void 0 ? void 0 : error.code) {
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
});
exports.addResident = addResident;
const updateResident = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = (0, convert_1.convertEmptyStringsToNull)(request.body);
    try {
        yield (0, validatorjs_1.default)({
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
        }, {
            nik: "required|string|max:36",
            nama: "required|string|max:128",
            tempat_lahir: "required|string|max:128",
            tanggal_lahir: "required|string|date",
            jenis_kelamin: "required|string|in:Laki-laki,Perempuan",
            pekerjaan: "required|string|max:128",
            agama: "required|string|in:Islam,Katolik,Kristen,Buddha,Hindu,Konghucu",
            status_pernikahan: "required|string|in:Cerai hidup,Cerai mati,Belum kawin,Kawin",
            pendidikan_terakhir: "required|string|max:40",
            nama_ayah: "required|string|max:36",
            nama_ibu: "required|string|max:36",
            nik_ayah: "required|string|max:36",
            nik_ibu: "required|string|max:36",
        });
        // const knexTransaction = await knex.transaction();
        // try {
        yield (0, knex_1.default)("residents")
            // .transacting(knexTransaction)
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
            update_at: (0, moment_1.default)().format("YYYY-MM-DD"),
        })
            .where({ nik: request.params.nik });
        yield (0, knex_1.default)("families_member")
            .update({
            status_keluarga: request.body.status_keluarga,
        })
            .where({ nik: request.params.nik });
        // await knexTransaction.commit();
        // // } catch (error) {
        //   //console.log(error);
        //   // knexTransaction.rollback();
        // }
        return response.status(201).send({ message: "Success update resident" });
    }
    catch (error) {
        switch (error === null || error === void 0 ? void 0 : error.code) {
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
});
exports.updateResident = updateResident;
const getResidentByNik = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, validatorjs_1.default)({ nik: request.params.nik }, { nik: "required|string|max:36" });
        const member = yield (0, knex_1.default)("families_member")
            .select("status_keluarga", "no_kk")
            .where("nik", request.params.nik)
            .then((res) => {
            return res[0];
        });
        const alamat = yield (0, family_repository_1.getIdAndAlamatByNoKK)(member["no_kk"]);
        const resident = yield residentRepository
            .getResidentMain(request.params.nik)
            .then((result) => {
            return result.map((resident) => {
                return Object.assign(Object.assign({}, resident), { tanggal_lahir: (0, moment_1.default)(resident.tanggal_lahir).format("yyyy-MM-DD") });
            });
        });
        const res = Object.assign(Object.assign(Object.assign({}, resident[0]), alamat), { status_keluarga: member.status_keluarga });
        return response.status(200).send(res);
    }
    catch (error) {
        switch (error === null || error === void 0 ? void 0 : error.code) {
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
});
exports.getResidentByNik = getResidentByNik;
const getResidentName = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nik = request.params.nik;
        // console.log(nik);
        const res = yield (0, knex_1.default)("residents")
            .select("nik", "nama")
            .whereILike("nik", "%" + nik + "%");
        return response.status(200).send(res);
    }
    catch (error) {
        console.log(error === null || error === void 0 ? void 0 : error.code);
        switch (error === null || error === void 0 ? void 0 : error.code) {
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
});
exports.getResidentName = getResidentName;
const residentRemove = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nik = request.params.nik;
        yield residentRepository.deleteResident(nik);
        return response.status(200).send({ message: "Sukses Hapus " });
    }
    catch (error) {
        //console.log(error);
        return response.status(500).send({
            code: "internal-server-error",
            errorMessages: error,
        });
    }
});
exports.residentRemove = residentRemove;

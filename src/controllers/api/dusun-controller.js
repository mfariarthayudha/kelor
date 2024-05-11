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
exports.dusunRemove = exports.dusunUpdate = exports.dusunAdd = exports.getDusunName = void 0;
const knex_1 = __importDefault(require("../../utilities/knex"));
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
const validatorjs_1 = __importDefault(require("../../utilities/validatorjs"));
const resident_repository_1 = require("../../repository/resident-repository");
moment_1.default.locale("id");
const getDusunName = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, knex_1.default)("dusun").select("dusun_id", "nama_dusun");
        return response.status(200).send(res);
    }
    catch (error) {
        console.log(error === null || error === void 0 ? void 0 : error.code);
        switch (error === null || error === void 0 ? void 0 : error.code) {
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
});
exports.getDusunName = getDusunName;
const dusunAdd = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, validatorjs_1.default)({
            nama_dusun: request.body.nama_dusun,
            kepala_dusun_nik: request.body.kepala_dusun_nik,
            jumlah_warga: request.body.jumlah_warga,
            luas_wilayah: request.body.luas_wilayah,
            keterangan: request.body.keterangan,
        }, {
            nama_dusun: "required|string|max:128",
            kepala_dusun_nik: "required|integer",
            jumlah_warga: "required|integer",
            luas_wilayah: "required|integer",
            keterangan: "required|string|max:512",
        });
        const checkDusun = yield (0, knex_1.default)("Dusun")
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
        const checkNik = yield (0, resident_repository_1.getName)(request.body.kepala_dusun_nik);
        if (checkNik === undefined) {
            return response.status(400).send({
                errorMessages: "NIK tidak terdaftar",
            });
        }
        const dusunId = (0, uuid_1.v4)();
        yield (0, knex_1.default)("dusun").insert({
            dusun_id: dusunId,
            nama_dusun: request.body.nama_dusun,
            kepala_dusun_nik: request.body.kepala_dusun_nik,
            luas_wilayah: request.body.luas_wilayah,
            jumlah_warga: request.body.jumlah_warga,
            keterangan: request.body.keterangan,
            create_at: (0, moment_1.default)().format("YYYY-MM-DD"),
            update_at: (0, moment_1.default)().format("YYYY-MM-DD"),
        });
        return response.status(201).send({ nama_dusun: request.body.nama_dusun });
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
exports.dusunAdd = dusunAdd;
const dusunUpdate = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dusun_id = request.params.dusunId;
        yield (0, validatorjs_1.default)({
            nama_dusun: request.body.nama_dusun,
            kepala_dusun_nik: request.body.kepala_dusun_nik,
            jumlah_warga: request.body.jumlah_warga,
            luas_wilayah: request.body.luas_wilayah,
            keterangan: request.body.keterangan,
        }, {
            nama_dusun: "required|string|max:128",
            kepala_dusun_nik: "required|integer",
            jumlah_warga: "required|integer",
            luas_wilayah: "required|integer",
            keterangan: "required|string|max:512",
        });
        const checkNik = yield (0, knex_1.default)("residents")
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
            yield knex_1.default.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, knex_1.default)("dusun")
                    .where({ dusun_id: dusun_id })
                    .update({
                    nama_dusun: request.body.nama_dusun,
                    kepala_dusun_nik: request.body.kepala_dusun_nik,
                    luas_wilayah: request.body.luas_wilayah,
                    jumlah_warga: request.body.jumlah_warga,
                    keterangan: request.body.keterangan,
                    update_at: (0, moment_1.default)().format("YYYY-MM-DD"),
                })
                    .transacting(trx);
                yield trx.commit();
                console.log("Sukses Update");
            }));
        }
        catch (error) {
            // If any error occurs, rollback the transaction
            console.error("Error occurred, rolling back transaction:", error);
            // await trx.rollback(error);
        }
        return response.status(200).send({ nama_dusun: request.body.nama_dusun });
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
exports.dusunUpdate = dusunUpdate;
const dusunRemove = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dusun_id = request.params.dusunId;
        const checkDusun = yield (0, knex_1.default)("families")
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
        const remove = yield (0, knex_1.default)("dusun").where("dusun_id", dusun_id).del();
        return response.status(200).send({ message: "Sukses Hapus dusun" });
    }
    catch (error) {
        //console.log(error);
        return response.status(500).send({
            code: "internal-server-error",
            errorMessages: error,
        });
    }
});
exports.dusunRemove = dusunRemove;

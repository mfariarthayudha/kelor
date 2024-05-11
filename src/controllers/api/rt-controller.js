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
exports.rtRemove = exports.rtUpdate = exports.rtAdd = exports.getRtName = void 0;
const knex_1 = __importDefault(require("../../utilities/knex"));
const validatorjs_1 = __importDefault(require("../../utilities/validatorjs"));
const moment_1 = __importDefault(require("moment"));
const rt_repository_1 = require("../../repository/rt-repository");
const uuid_1 = require("uuid");
const resident_repository_1 = require("../../repository/resident-repository");
moment_1.default.locale("id");
const getRtName = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rwId = request.params.rwId;
        const rtNameAll = yield (0, knex_1.default)("rt")
            .select("rt_id", "no_rt")
            .where("rw_id", rwId);
        return response.status(200).send(rtNameAll);
    }
    catch (error) {
        console.log(error === null || error === void 0 ? void 0 : error.code);
        switch (error === null || error === void 0 ? void 0 : error.code) {
            case undefined:
                return response.status(404).send({
                    code: "Tidak ditemukan",
                    errorMessages: "No RT tidak ditemukan",
                });
            default:
                return response.status(500).send({
                    code: "internal-server-error",
                    errorMessages: error,
                });
        }
    }
});
exports.getRtName = getRtName;
const rtAdd = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, validatorjs_1.default)({
            no_rt: request.body.no_rt,
            rw: request.body.rw,
            dusun: request.body.dusun,
            jumlah_keluarga: request.body.jumlah_keluarga,
            nik_ketua_rt: request.body.nik_ketua_rt,
            jumlah_warga: request.body.jumlah_warga,
        }, {
            no_rt: "required|string|max:2",
            rw: "required|string|max:36",
            dusun: "required|string|max:36",
            jumlah_keluarga: "required|integer",
            nik_ketua_rt: "required|integer",
            jumlah_warga: "required|integer",
        });
        const checkRt = yield (0, knex_1.default)("rt")
            .select("rt_id")
            .where("rw_id", request.body.rw)
            .andWhereILike("no_rt", request.body.no_rt)
            .then((res) => {
            return res[0];
        });
        if (checkRt) {
            const dusun = yield (0, rt_repository_1.getAlamatByRtId)(checkRt.rt_id);
            return response.status(400).send({
                code: "400",
                errorMessages: "No RT sudah terdaftar pada " +
                    dusun.nama_dusun +
                    " No RW " +
                    dusun.no_rw,
            });
        }
        const checkNik = yield (0, resident_repository_1.getName)(request.body.nik_ketua_rt);
        if (checkNik === undefined) {
            return response.status(400).send({
                errorMessages: "NIK tidak terdaftar",
            });
        }
        const rtId = (0, uuid_1.v4)();
        yield (0, knex_1.default)("rt").insert({
            rt_id: rtId,
            no_rt: request.body.no_rt,
            rw_id: request.body.rw,
            jumlah_keluarga: request.body.jumlah_keluarga,
            keterangan: request.body.keterangan,
            jumlah_warga: request.body.jumlah_warga,
            ketua_rt_nik: request.body.nik_ketua_rt,
            create_at: (0, moment_1.default)().format("YYYY-MM-DD"),
            update_at: (0, moment_1.default)().format("YYYY-MM-DD"),
        });
        const res = yield (0, rt_repository_1.getAlamatByRtId)(rtId);
        return response.status(201).send(res);
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
exports.rtAdd = rtAdd;
const rtUpdate = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rt_id = request.params.rtId;
        yield (0, validatorjs_1.default)({
            rw: request.body.rw,
            jumlah_keluarga: request.body.jumlah_keluarga,
            nik_ketua_rt: request.body.nik_ketua_rt,
            jumlah_warga: request.body.jumlah_warga,
        }, {
            rw: "required|string|max:36",
            jumlah_keluarga: "required|integer",
            nik_ketua_rt: "required|integer",
            jumlah_warga: "required|integer",
        });
        const checkNik = yield (0, knex_1.default)("residents")
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
        const knexTransaction = yield knex_1.default.transaction();
        try {
            yield knex_1.default.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, knex_1.default)("rt")
                    .update({
                    rw_id: request.body.rw,
                    jumlah_keluarga: request.body.jumlah_keluarga,
                    keterangan: request.body.keterangan,
                    jumlah_warga: request.body.jumlah_warga,
                    ketua_rt_nik: request.body.nik_ketua_rt,
                    update_at: (0, moment_1.default)().format("YYYY-MM-DD"),
                })
                    .where({ rt_id: rt_id })
                    .transacting(trx)
                    .then((res) => console.log("Sukses Update"));
            }));
        }
        catch (error) {
            knexTransaction.rollback();
        }
        const res = yield (0, rt_repository_1.getAlamatByRtId)(rt_id);
        return response.status(200).send(res);
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
exports.rtUpdate = rtUpdate;
const rtRemove = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rt_id = request.params.rtId;
        const remove = yield (0, knex_1.default)("rt").where("rt_id", rt_id).del();
        return response.status(200).send({ message: "Sukses Hapus RT" });
    }
    catch (error) {
        //console.log(error);
        return response.status(500).send({
            code: "internal-server-error",
            errorMessages: error,
        });
    }
});
exports.rtRemove = rtRemove;

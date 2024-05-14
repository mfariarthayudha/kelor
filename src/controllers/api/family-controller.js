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
exports.RemoveFamily = exports.updateFamily = exports.checkNoKK = exports.getFamily = exports.createFamily = void 0;
const validatorjs_1 = __importDefault(require("../../utilities/validatorjs"));
const knex_1 = __importDefault(require("../../utilities/knex"));
const resident_repository_1 = require("../../repository/resident-repository");
const familyRepository = __importStar(require("../../repository/family-repository"));
const moment_1 = __importDefault(require("moment"));
(0, moment_1.default)().local();
moment_1.default.locale("id");
const createFamily = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, validatorjs_1.default)({
            no_kk: request.body.no_kk,
            alamat: request.body.alamat,
            rt: request.body.rt,
            rw: request.body.rw,
            dusun: request.body.dusun,
        }, {
            no_kk: "required|string|max:36",
            alamat: "required|string|max:36",
            rt: "required|string|max:36",
            rw: "required|string|max:36",
            dusun: "required|string|max:36",
        });
        const checkNoKK = yield (0, knex_1.default)("families")
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
        const family = {
            no_kk: request.body.no_kk,
            alamat: request.body.alamat,
            rt: request.body.rt,
            rw: request.body.rw,
            dusun: request.body.dusun,
            kode_pos: request.body.kode_pos,
            create_at: new Date((0, moment_1.default)().toDate()),
            update_at: new Date((0, moment_1.default)().toDate()),
        };
        const res = yield familyRepository.insertFamily(family);
        if (res) {
            return response.status(201).send({ no_kk: request.body.no_kk });
        }
    }
    catch (error) {
        switch (error === null || error === void 0 ? void 0 : error.code) {
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
});
exports.createFamily = createFamily;
const getFamily = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const family = yield (0, knex_1.default)("families").where({ no_kk: request.body.no_kk });
        return response.status(200).send(family[0]);
    }
    catch (error) {
        console.log(error === null || error === void 0 ? void 0 : error.code);
        switch (error === null || error === void 0 ? void 0 : error.code) {
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
});
exports.getFamily = getFamily;
const checkNoKK = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield familyRepository.getIdAndAlamatByNoKK(request.body.no_kk);
        return response.status(200).send(res);
    }
    catch (error) {
        console.log(error === null || error === void 0 ? void 0 : error.code);
        switch (error === null || error === void 0 ? void 0 : error.code) {
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
});
exports.checkNoKK = checkNoKK;
const updateFamily = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // const trx = await knex.transaction();
    try {
        const no_kk = request.params.no_kk;
        yield (0, validatorjs_1.default)({
            alamat: request.body.alamat,
            rt: request.body.rt,
            rw: request.body.rw,
            dusun: request.body.dusun,
            kode_pos: request.body.kode_pos,
            approved: request.body.approved,
        }, {
            alamat: "required|string|max:256",
            rt: "required|string|max:36",
            rw: "required|string|max:36",
            approved: "required|integer",
            kode_pos: "required|string|max:5",
            dusun: "required|string|max:36",
        });
        yield (0, knex_1.default)("families")
            .update({
            alamat: request.body.alamat,
            dusun_id: request.body.dusun,
            rw_id: request.body.rw,
            rt_id: request.body.rt,
            kode_pos: request.body.kode_pos,
            approved: request.body.approved,
            update_at: (0, moment_1.default)().format("YYYY-MM-DD"),
        })
            .where("no_kk", no_kk);
        // trx.commit();
        return response.status(200).send({ no_kk: no_kk });
    }
    catch (error) {
        // trx.rollback();
        console.log(error === null || error === void 0 ? void 0 : error.code);
        switch (error === null || error === void 0 ? void 0 : error.code) {
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
});
exports.updateFamily = updateFamily;
const RemoveFamily = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const no_kk = request.params.no_kk;
        yield (0, knex_1.default)("families").where("no_kk", no_kk).del();
        const nik = yield (0, knex_1.default)("families_member")
            .select("nik")
            .where("no_kk", no_kk)
            .then((res) => {
            return res[0];
        });
        if (nik) {
            yield (0, knex_1.default)("families_member").where("no_kk").del();
            nik.map((nik) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, resident_repository_1.deleteResident)(nik);
            }));
        }
        return response.status(200).send({ message: "Sukses hapus surat" });
    }
    catch (error) {
        //console.log(error);
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
});
exports.RemoveFamily = RemoveFamily;

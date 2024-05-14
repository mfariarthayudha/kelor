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
exports.rwRemove = exports.rwUpdate = exports.createRw = exports.getRwName = void 0;
const knex_1 = __importDefault(require("../../utilities/knex"));
const validatorjs_1 = __importDefault(require("../../utilities/validatorjs"));
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
const resident_repository_1 = require("../../repository/resident-repository");
(0, moment_1.default)().local();
moment_1.default.locale("id");
const getRwName = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dusun_id = request.params.dusunId;
        const res = yield (0, knex_1.default)("rw")
            .select("rw_id", "no_rw")
            .where("dusun_id", dusun_id);
        return response.status(200).send(res);
    }
    catch (error) {
        console.log(error === null || error === void 0 ? void 0 : error.code);
        switch (error === null || error === void 0 ? void 0 : error.code) {
            case undefined:
                return response.status(404).send({
                    code: "Tidak ditemukan",
                    errorMessages: "No RW tidak ditemukan",
                });
            default:
                return response.status(500).send({
                    code: "internal-server-error",
                    errorMessages: error,
                });
        }
    }
});
exports.getRwName = getRwName;
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
const createRw = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, validatorjs_1.default)({
            no_rw: request.body.no_rw,
            dusun: request.body.dusun,
            jumlah_keluarga: request.body.jumlah_keluarga,
            nik_ketua_rw: request.body.nik_ketua_rw,
            jumlah_warga: request.body.jumlah_warga,
        }, {
            no_rw: "required|string|max:2",
            dusun: "required|string|max:36",
            jumlah_keluarga: "required|integer",
            nik_ketua_rw: "required|integer",
            jumlah_warga: "required|integer",
        });
        const checkRw = yield (0, knex_1.default)("rw")
            .select("no_rw")
            .andWhereILike("no_rw", request.body.no_rw)
            .where("dusun_id", request.body.dusun)
            .then((res) => {
            return res[0];
        });
        if (checkRw) {
            const dusun = yield (0, knex_1.default)("dusun")
                .select("nama_dusun")
                .where("dusun_id", request.body.dusun)
                .then((res) => {
                return res[0];
            });
            return response.status(400).send({
                errorMessages: "No RW " +
                    checkRw.no_rw +
                    " sudah terdaftar pada " +
                    dusun.nama_dusun,
            });
        }
        const checkNik = yield (0, resident_repository_1.getName)(request.body.nik_ketua_rw);
        if (checkNik === undefined) {
            return response.status(400).send({
                errorMessages: "NIK tidak terdaftar",
            });
        }
        const rwId = (0, uuid_1.v4)();
        yield (0, knex_1.default)("rw").insert({
            rw_id: rwId,
            no_rw: request.body.no_rw,
            dusun_id: request.body.dusun,
            jumlah_keluarga: request.body.jumlah_keluarga,
            keterangan: request.body.keterangan,
            jumlah_warga: request.body.jumlah_warga,
            ketua_rw_nik: request.body.nik_ketua_rw,
            create_at: (0, moment_1.default)().format("YYYY-MM-DD"),
            update_at: (0, moment_1.default)().format("YYYY-MM-DD"),
        });
        const res = yield (0, knex_1.default)("dusun")
            .select("nama_dusun")
            .where("dusun_id", request.body.dusun)
            .then((res) => {
            return res[0];
        });
        return response
            .status(201)
            .send({ nama_dusun: res.nama_dusun, no_rw: request.body.no_rw });
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
exports.createRw = createRw;
const rwUpdate = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rw_id = request.params.rwId;
        console.log("rw id ", rw_id);
        yield (0, validatorjs_1.default)({
            dusun: request.body.dusun,
            jumlah_keluarga: request.body.jumlah_keluarga,
            nik_ketua_rw: request.body.nik_ketua_rw,
            jumlah_warga: request.body.jumlah_warga,
        }, {
            dusun: "required|string|max:36",
            jumlah_keluarga: "required|integer",
            nik_ketua_rw: "required|integer",
            jumlah_warga: "required|integer",
        });
        // const checkRw = await knex("rw")
        //   .select("no_rw")
        //   .andWhereILike("no_rw", request.body.no_rw)
        //   .where("dusun_id", request.body.dusun)
        //   .then((res) => {
        //     return res[0];
        //   });
        const checkNik = yield (0, knex_1.default)("residents")
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
        yield (0, knex_1.default)("rw")
            .update({
            dusun_id: request.body.dusun,
            jumlah_keluarga: request.body.jumlah_keluarga,
            keterangan: request.body.keterangan,
            jumlah_warga: request.body.jumlah_warga,
            ketua_rw_nik: request.body.nik_ketua_rw,
            update_at: (0, moment_1.default)().format("YYYY-MM-DD"),
        })
            .where({ rw_id: rw_id });
        console.log("Sukses Update");
        const res = yield (0, knex_1.default)("dusun")
            .select("dusun.nama_dusun", "rw.no_rw")
            .innerJoin("rw", "dusun.dusun_id", "rw.dusun_id")
            .where("rw_id", rw_id)
            .then((res) => {
            return res[0];
        });
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
exports.rwUpdate = rwUpdate;
const rwRemove = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rw_id = request.params.rwId;
        const remove = yield (0, knex_1.default)("rw").where("rw_id", rw_id).del();
        return response.status(200).send({ message: "Sukses Hapus RW" });
    }
    catch (error) {
        //console.log(error);
        return response.status(500).send({
            code: "internal-server-error",
            errorMessages: error,
        });
    }
});
exports.rwRemove = rwRemove;

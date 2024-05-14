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
exports.tesAja = exports.rtUpdate = exports.rtAdd = exports.getAllRt = void 0;
const knex_1 = __importDefault(require("../../utilities/knex"));
const moment_1 = __importDefault(require("moment"));
(0, moment_1.default)().local();
moment_1.default.locale("id");
const getAllRt = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const rt = yield (0, knex_1.default)("rt")
        .select("rt.rt_id", "rt.no_rt", "rw.no_rw", "dusun.nama_dusun", "residents.nama", "rt.jumlah_keluarga", "rt.jumlah_warga")
        .innerJoin("rw", "rt.rw_id", "rw.rw_id")
        .innerJoin("dusun", "rw.dusun_id", "dusun.dusun_id")
        .innerJoin("residents", "rt.ketua_rt_nik", "residents.nik");
    return response.render("pages/data/index/list-rt", { rt: rt });
});
exports.getAllRt = getAllRt;
const rtAdd = (request, response) => {
    return response.render("pages/data/add/rt");
};
exports.rtAdd = rtAdd;
const rtUpdate = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const rt_id = request.params.rtId;
    const rt = yield (0, knex_1.default)("rt")
        .select("rt.*", "rw.no_rw", "residents.nama as nama", "dusun.nama_dusun", "dusun.dusun_id")
        .where("rt_id", rt_id)
        .innerJoin("rw", "rw.rw_id", "rt.rw_id")
        .innerJoin("dusun", "rw.dusun_id", "dusun.dusun_id")
        .innerJoin("residents", "rt.ketua_rt_nik", "residents.nik")
        .then((result) => {
        return result.map((rt) => {
            return Object.assign(Object.assign({}, rt), { update_at: (0, moment_1.default)(rt.update_at).format("dddd, DD MMMM YYYY") });
        });
    });
    return response.render("pages/data/edit/rt", rt[0]);
});
exports.rtUpdate = rtUpdate;
const tesAja = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, knex_1.default)("tes").then((res) => {
        return res[0];
    });
    return response.render("document-template/tes", res.content);
});
exports.tesAja = tesAja;

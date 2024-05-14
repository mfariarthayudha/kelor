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
exports.getFamilyAll = exports.familyUpdate = exports.familyAdd = void 0;
const knex_1 = __importDefault(require("../../utilities/knex"));
const family_repository_1 = require("../../repository/family-repository");
const moment_1 = __importDefault(require("moment"));
(0, moment_1.default)().local();
moment_1.default.locale("id");
const familyAdd = (request, response) => {
    return response.render("pages/data/add/family");
};
exports.familyAdd = familyAdd;
const familyUpdate = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const no_kk = request.params.no_kk;
        const alamat = yield (0, family_repository_1.getIdAlamatByNoKK)(no_kk);
        const additional = yield (0, knex_1.default)("families")
            .select("kode_pos", "approved", "update_at")
            .where("no_kk", no_kk)
            .then((result) => {
            return result.map((family) => {
                return Object.assign(Object.assign({}, family), { update_at: (0, moment_1.default)(family.update_at).format("dddd, DD MMMM YYYY") });
            });
        });
        const member = yield (0, knex_1.default)("families_member")
            .select("families_member.nik as nik", "families_member.status_keluarga as status_keluarga", "residents.nama as nama")
            .innerJoin("residents", "families_member.nik", "residents.nik")
            .where("families_member.no_kk", no_kk);
        console.log(alamat);
        return response.render("pages/data/edit/family", Object.assign({ no_kk: no_kk, member: member, alamat: alamat }, additional[0]));
    }
    catch (error) {
        return response.status(404).send({
            code: "internal-server-error",
            errorMessages: "Tidak dapat ditemukan",
        });
    }
});
exports.familyUpdate = familyUpdate;
const getFamilyAll = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, knex_1.default)("families")
        .select("families.no_kk as no_kk", "families.alamat as alamat", "families.create_at as create_at", "dusun.nama_dusun as dusun", "rw.no_rw as rw", "rt.no_rt as rt")
        .innerJoin("dusun", "families.dusun_id", "dusun.dusun_id")
        .innerJoin("rw", "families.rw_id", "rw.rw_id")
        .innerJoin("rt", "families.rt_id", "rt.rt_id")
        .then((result) => {
        return result.map((family) => {
            return Object.assign(Object.assign({}, family), { create_at: (0, moment_1.default)(family.create_at).format("DD MMMM YYYY") });
        });
    });
    console.log(res);
    return response.render("pages/data/index/list-family", { family: res });
});
exports.getFamilyAll = getFamilyAll;

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
exports.updateRw = exports.addRw = exports.getAllRw = void 0;
const knex_1 = __importDefault(require("../../utilities/knex"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale("id");
const getAllRw = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const rw = yield (0, knex_1.default)("dusun")
        .select("rw.rw_id", "rw.no_rw", "residents.nama as ketua_rw", "dusun.nama_dusun ", "rw.jumlah_keluarga", "rw.jumlah_warga")
        .innerJoin("rw", "rw.dusun_id", "dusun.dusun_id")
        .innerJoin("residents", "rw.ketua_rw_nik", "residents.nik");
    return response.render("pages/data/index/list-rw", { rw: rw });
});
exports.getAllRw = getAllRw;
const addRw = (request, response) => {
    return response.render("pages/data/add/rw");
};
exports.addRw = addRw;
const updateRw = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const rw_id = request.params.rwId;
    const rw = yield (0, knex_1.default)("rw")
        .select("rw.*", "residents.nama")
        .innerJoin("residents", "rw.ketua_rw_nik", "residents.nik")
        .where("rw_id", rw_id)
        .then((result) => {
        return result.map((rw) => {
            return Object.assign(Object.assign({}, rw), { update_at: (0, moment_1.default)(rw.update_at).format("dddd, DD MMMM YYYY") });
        });
    });
    return response.render("pages/data/edit/rw", rw[0]);
});
exports.updateRw = updateRw;

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
exports.dusunAdd = exports.dusunUpdate = exports.getAllDusun = void 0;
const knex_1 = __importDefault(require("../../utilities/knex"));
const moment_1 = __importDefault(require("moment"));
(0, moment_1.default)().local();
moment_1.default.locale("id");
// function splitObj(obj: object) {
//   const key = Object.keys(obj);
//   return key;
// }
const getAllDusun = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const dusun = yield (0, knex_1.default)("dusun")
        .select("dusun.dusun_id", "dusun.nama_dusun", "dusun.luas_wilayah", "dusun.jumlah_warga", "dusun.create_at", "residents.nama")
        .innerJoin("residents", "dusun.kepala_dusun_nik", "residents.nik")
        .then((result) => {
        return result.map((dusun) => {
            return Object.assign(Object.assign({}, dusun), { create_at: (0, moment_1.default)(dusun.create_at).format("DD MMMM YYYY") });
        });
    });
    // console.log(dusun);
    return response.render("pages/data/index/list-dusun", { dusun: dusun });
});
exports.getAllDusun = getAllDusun;
const dusunUpdate = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const dusun_id = request.params.dusunId;
    const dusun = yield (0, knex_1.default)("dusun")
        .select("dusun.*", "residents.nama as nama")
        .innerJoin("residents", "dusun.kepala_dusun_nik", "residents.nik")
        .where("dusun_id", dusun_id)
        .then((result) => {
        return result.map((dusun) => {
            return Object.assign(Object.assign({}, dusun), { update_at: (0, moment_1.default)(dusun.update_at).format("dddd, DD MMMM YYYY") });
        });
    });
    return response.render("pages/data/edit/dusun", dusun[0]);
});
exports.dusunUpdate = dusunUpdate;
const dusunAdd = (request, response) => {
    return response.render("pages/data/add/dusun");
};
exports.dusunAdd = dusunAdd;

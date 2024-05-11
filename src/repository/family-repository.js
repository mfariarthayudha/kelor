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
exports.insertFamily = exports.getIdAlamatByNoKK = exports.getIdAndAlamatByNoKK = void 0;
const knex_1 = __importDefault(require("../utilities/knex"));
const getIdAndAlamatByNoKK = (no_kk) => __awaiter(void 0, void 0, void 0, function* () {
    const id_alamat = yield (0, knex_1.default)("families")
        .select("families.alamat", "families.rt_id", "families.rw_id", "families.dusun_id", "dusun.nama_dusun", "rw.no_rw", "rt.no_rt")
        .innerJoin("dusun", "families.dusun_id", "dusun.dusun_id")
        .innerJoin("rw", "families.rw_id", "rw.rw_id")
        .innerJoin("rt", "families.rt_id", "rt.rt_id")
        .where({ no_kk: no_kk })
        .then((res) => {
        console.log(res);
        return res[0];
    });
    return id_alamat;
});
exports.getIdAndAlamatByNoKK = getIdAndAlamatByNoKK;
const getIdAlamatByNoKK = (no_kk) => __awaiter(void 0, void 0, void 0, function* () {
    const alamat = yield (0, knex_1.default)("families")
        .select("families.alamat", "families.rt_id", "families.rw_id", "families.dusun_id")
        .where({ no_kk: no_kk })
        .then((res) => {
        console.log(res);
        return res[0];
    });
    return alamat;
});
exports.getIdAlamatByNoKK = getIdAlamatByNoKK;
const insertFamily = (obj, approved = 1, trx = null) => __awaiter(void 0, void 0, void 0, function* () {
    const query = (0, knex_1.default)("families").insert({
        no_kk: obj.no_kk,
        alamat: obj.alamat,
        rt_id: obj.rt,
        rw_id: obj.rw,
        kode_pos: obj.kode_pos,
        dusun_id: obj.dusun,
        approved: approved,
        create_at: obj.create_at,
        update_at: obj.update_at,
    });
    if (trx) {
        return yield query.transacting(trx);
    }
    else {
        return yield query;
    }
});
exports.insertFamily = insertFamily;

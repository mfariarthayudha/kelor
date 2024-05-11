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
exports.getAlamatByRtId = void 0;
const knex_1 = __importDefault(require("../utilities/knex"));
const getAlamatByRtId = (rt_id) => __awaiter(void 0, void 0, void 0, function* () {
    const dusun = yield (0, knex_1.default)("rt")
        .select("dusun.nama_dusun", "rw.no_rw", "rt.no_rt")
        .innerJoin("rw", "rt.rw_id", "rw.rw_id")
        .innerJoin("dusun", "rw.dusun_id", "dusun.dusun_id")
        .where("rt_id", rt_id)
        .then((res) => {
        return res[0];
    });
    return dusun;
});
exports.getAlamatByRtId = getAlamatByRtId;

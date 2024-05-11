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
exports.dashboard = void 0;
const knex_1 = __importDefault(require("../../utilities/knex"));
const dashboard = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const [dusunCount, rwCount, rtCount, residentCount, documentCount] = yield Promise.all([
        (0, knex_1.default)("dusun").count("dusun_id as count"),
        (0, knex_1.default)("rw").count("rw_id as count"),
        (0, knex_1.default)("rt").count("rt_id as count"),
        (0, knex_1.default)("residents").count("nik as count"),
        (0, knex_1.default)("document_results").count("document_result_id as count"),
    ]);
    console.log(request.session.user);
    return response.render("pages/dashboard", {
        dusun: dusunCount[0]["count"],
        rt: rtCount[0]["count"],
        rw: rwCount[0]["count"],
        warga: residentCount[0]["count"],
        surat: documentCount[0]["count"],
    });
});
exports.dashboard = dashboard;

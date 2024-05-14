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
exports.getresidentAll = exports.residentUpdate = exports.residentAdd = void 0;
const knex_1 = __importDefault(require("../../utilities/knex"));
const moment_1 = __importDefault(require("moment"));
const resident_repository_1 = require("../../repository/resident-repository");
const residentAdd = (request, response) => {
    return response.render("pages/data/add/resident");
};
exports.residentAdd = residentAdd;
const residentUpdate = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nik = request.params.nik;
        const residentMore = yield (0, resident_repository_1.getResidentFull)(nik).then((result) => {
            return result.map((resident) => {
                delete resident.update_at;
                return Object.assign(Object.assign({}, resident), { tanggal_lahir: resident.tanggal_lahir !== null
                        ? (0, moment_1.default)(resident.tanggal_lahir).format("yyyy-MM-DD")
                        : "", tanggal_berakhir_paspor: resident.tanggal_berakhir_paspor !== null
                        ? (0, moment_1.default)(resident.tanggal_berakhir_paspor).format("yyyy-MM-DD")
                        : "", tanggal_perceraian: resident.tanggal_perceraian !== null
                        ? (0, moment_1.default)(resident.tanggal_perceraian).format("yyyy-MM-DD")
                        : "", tanggal_perkawinan: resident.tanggal_perkawinan !== null
                        ? (0, moment_1.default)(resident.tanggal_perkawinan).format("yyyy-MM-DD")
                        : "", update_at: (0, moment_1.default)(resident.update_at).format("dddd, DD MMMM YYYY") });
            });
        });
        console.log("resident:", residentMore[0]);
        return response.render("pages/data/edit/resident", residentMore[0]);
    }
    catch (error) {
        return response.redirect("/error/404");
    }
});
exports.residentUpdate = residentUpdate;
const getresidentAll = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const resident = yield (0, knex_1.default)("residents")
        .select("nik", "nama", "tanggal_lahir", "jenis_kelamin", "pekerjaan")
        .then((result) => {
        return result.map((document) => {
            return Object.assign(Object.assign({}, document), { tanggal_lahir: (0, moment_1.default)(document.tanggal_lahir).format("DD MMMM YYYY") });
        });
    });
    return response.render("pages/data/index/list-resident", {
        resident: resident,
    });
});
exports.getresidentAll = getresidentAll;

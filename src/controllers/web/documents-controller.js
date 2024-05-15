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
exports.createSuratKKf101 = exports.createSuratPernyataanSKU = exports.createSKKMSekolah = exports.createSKKMRumahSakit = exports.createSuratKeteranganDomisiliUsaha = exports.viewSurat = exports.getDocumentAll = void 0;
const knex_1 = __importDefault(require("../../utilities/knex"));
const htmlToPdf_1 = __importDefault(require("../../utilities/htmlToPdf"));
const moment_1 = __importDefault(require("moment"));
(0, moment_1.default)().local();
moment_1.default.locale("id");
const getDocumentAll = (request, response) => {
    return response.render("pages/data/index/list-surat");
};
exports.getDocumentAll = getDocumentAll;
const viewSurat = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const document_result_id = request.params.documentResultId;
    try {
        let surat = yield (0, knex_1.default)("document_results")
            .select("document_result_id", "document_type_id", "content", "signed")
            .where("document_result_id", document_result_id)
            .then((res) => {
            return res[0];
        });
        surat.content = surat.content.replaceAll("(base_url)", String(process.env.BASE_URL_ONLINE));
        const pdf = yield (0, htmlToPdf_1.default)(surat["content"]);
        response.status(200).contentType("application/pdf").send(pdf);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ errorMessage: error });
    }
});
exports.viewSurat = viewSurat;
const createSuratKeteranganDomisiliUsaha = (request, response) => {
    return response.render("pages/document/form/surat-keterangan-domisili-usaha", { formulir_judul: "SURAT KETERANGAN DOMISILI USAHA" });
};
exports.createSuratKeteranganDomisiliUsaha = createSuratKeteranganDomisiliUsaha;
const createSKKMRumahSakit = (request, response) => {
    return response.render("pages/document/form/skkm-rumah-sakit", {
        formulir_judul: "SURAT KETERANGAN KELUARGA MISKIN/TIDAK MAMPU",
    });
};
exports.createSKKMRumahSakit = createSKKMRumahSakit;
const createSKKMSekolah = (request, response) => {
    return response.render("pages/document/form/skkm-sekolah", {
        formulir_judul: "SURAT KETERANGAN KELUARGA MISKIN/TIDAK MAMPU",
    });
};
exports.createSKKMSekolah = createSKKMSekolah;
const createSuratPernyataanSKU = (request, response) => {
    return response.render("pages/document/form/surat-pernyataan-SKU", {
        formulir_judul: "SURAT PERNYATAAN SKU",
    });
};
exports.createSuratPernyataanSKU = createSuratPernyataanSKU;
const createSuratKKf101 = (request, response) => {
    return response.render("pages/document/form/surat-kk-f101", {
        formulir_judul: "FORMULIR ISIAN BIODATA PENDUDUK UNTUK WNI ( PERKELUARGA )",
    });
};
exports.createSuratKKf101 = createSuratKKf101;

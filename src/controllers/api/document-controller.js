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
exports.createSKKMSekolah = exports.createSKKMRumahSakit = exports.createSuratKeteranganUsaha = exports.createSuratPernyataanSKU = exports.createSuratkkF101 = exports.signDocument = exports.createSuratKeteranganDomisiliUsaha = exports.getDocumentApi = exports.removeDocumentResult = exports.updateDocumentType = exports.addDocumentType = void 0;
const lodash_1 = __importDefault(require("lodash"));
const uuid_1 = require("uuid");
const zod_1 = require("zod");
const zod_validation_error_1 = require("zod-validation-error");
const knex_1 = __importDefault(require("../../utilities/knex"));
const validatorjs_1 = __importDefault(require("../../utilities/validatorjs"));
const convert_1 = require("../../utilities/convert");
const resident_repository_1 = require("../../repository/resident-repository");
const rt_repository_1 = require("../../repository/rt-repository");
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale("id");
function addDocumentType(request, response, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const knexTransaction = yield knex_1.default.transaction();
        try {
            const requestInput = yield zod_1.z
                .object({
                documentType: zod_1.z.string().max(128),
                requirements: zod_1.z.string().array().optional(),
                inputFields: zod_1.z
                    .object({
                    type: zod_1.z.enum(["text", "number", "date", "list"]),
                    label: zod_1.z.string().max(32),
                    variableName: zod_1.z.string().max(64),
                })
                    .array(),
            })
                .parseAsync({
                documentType: request.body.documentType,
                requirements: request.body.requirements,
                inputFields: request.body.inputFields,
            })
                .catch(function (error) {
                throw {
                    httpStatusCode: 400,
                    responseBody: (0, zod_validation_error_1.fromZodError)(error),
                };
            });
            const currentDatetime = (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss");
            const requirements = ((_a = requestInput.requirements) === null || _a === void 0 ? void 0 : _a.filter(function (requirement) {
                if (lodash_1.default.toString(requirement).length < 1)
                    return false;
                return true;
            })) || [];
            if (requirements.length !== new Set(requirements).size) {
                throw {
                    httpStatusCode: 400,
                    responseBody: {
                        code: "validation-fails",
                        errorMessages: {
                            requirements: "Terdapat duplikat pada persyaratan dokumen",
                        },
                    },
                };
            }
            yield (0, knex_1.default)("document_types")
                .where("document_type", requestInput.documentType)
                .limit(1)
                .count("document_type_id as documentCount")
                .then((result) => {
                if (result[0].documentCount == 1) {
                    throw {
                        httpStatusCode: 409,
                        responseBody: { code: "document-type-already-exist" },
                    };
                }
            });
            const documentTypeId = (0, uuid_1.v4)();
            yield knexTransaction
                .insert({
                document_type_id: documentTypeId,
                document_type: requestInput.documentType,
                requirements: requirements.join(";"),
                created_at: currentDatetime,
                updated_at: currentDatetime,
            })
                .into("document_types");
            const inputFields = requestInput.inputFields.map(function (inputField, index) {
                const parentId = (0, uuid_1.v4)();
                return {
                    document_input_field_id: parentId,
                    document_type_id: documentTypeId,
                    parent: inputField.type == "list" ? parentId : null,
                    type: inputField.type,
                    label: inputField.label,
                    variable_name: inputField.variableName,
                    show_order: index + 1,
                    created_at: currentDatetime,
                    updated_at: currentDatetime,
                };
            });
            yield knexTransaction.insert(inputFields).into("document_input_fields");
            yield knexTransaction.commit();
            return response.status(204).send();
        }
        catch (error) {
            yield knexTransaction.rollback();
            return next(error);
        }
    });
}
exports.addDocumentType = addDocumentType;
const updateDocumentType = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, validatorjs_1.default)({
            documentType: request.body.documentType,
            requirements: request.body.requirements,
        }, {
            documentType: "required|string|max:128",
            requirements: "required|array",
        });
        const requirements = request.body.requirements.filter((requirement) => {
            if (lodash_1.default.toString(requirement).length < 1)
                return false;
            return true;
        });
        if (requirements.length !== new Set(requirements).size) {
            throw { code: "duplicate-requirements" };
        }
        yield (0, knex_1.default)("document_types")
            .where("document_type", request.body.documentType)
            .whereNot("document_type_id", request.params.documentTypeId)
            .limit(1)
            .count("document_type_id as documentCount")
            .then((result) => {
            if (result[0].documentCount == 1) {
                throw { code: "document-type-already-exist" };
            }
        });
        yield (0, knex_1.default)("document_types")
            .where("document_type_id", request.params.documentTypeId)
            .limit(1)
            .update({
            document_type: request.body.documentType,
            requirements: requirements.join(";"),
            updated_at: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
        })
            .then((affectedRows) => {
            if (affectedRows < 1) {
                throw { code: "document-type-id-not-found" };
            }
        });
        return response.status(204).send();
    }
    catch (error) {
        //console.log(error);
        switch (error.code) {
            case "validation-fails":
                return next({
                    httpStatusCode: 400,
                    responseBody: {
                        code: "validation-fails",
                        errorMessages: error.errorMessages,
                    },
                });
            case "duplicate-requirements":
                return next({
                    httpStatusCode: 400,
                    responseBody: {
                        code: "validation-fails",
                        errorMessages: {
                            requirements: "Terdapat duplikat pada persyaratan dokumen",
                        },
                    },
                });
            case "document-type-already-exist":
                return next({
                    httpStatusCode: 409,
                    responseBody: { code: "document-type-already-exist" },
                });
            case "document-type-id-not-found":
                return next({
                    httpStatusCode: 404,
                    responseBody: { code: "document-type-id-not-found" },
                });
        }
    }
});
exports.updateDocumentType = updateDocumentType;
const removeDocumentResult = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const document_result_id = request.params.documentResultId;
    try {
        yield (0, knex_1.default)("document_results")
            .where("document_result_id", document_result_id)
            .limit(1)
            .delete()
            .then((affectedRows) => {
            if (affectedRows < 1) {
                throw { code: "document-result-id-not-found" };
            }
        });
        return response.status(200).send({ message: "Sukses hapus surat" });
    }
    catch (error) {
        //console.log(error);
        switch (error.code) {
            case "document-result-id-not-found":
                return response.status(400).send({
                    code: "Tidak ditemukan",
                    errorMessages: "Dokumen tidak ditemukan",
                });
            default:
                return response.status(500).send({
                    code: "Error",
                    errorMessages: error,
                });
        }
    }
});
exports.removeDocumentResult = removeDocumentResult;
const getDocumentApi = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let draw = request.body.draw;
        let start = +request.body.start;
        let length = +request.body.length;
        let order_data = request.body.order;
        var search_value = request.body.search["value"];
        const total_records = yield (0, knex_1.default)("document_results")
            .count("document_result_id as jumlah")
            .then((res) => {
            return res[0].jumlah;
        });
        const total_records_with_filter = yield (0, knex_1.default)("document_types")
            .whereILike("document_types.document_type", `%${search_value}%`)
            .orWhereILike("document_results.applicant_name", `%${search_value}%`)
            .orWhereILike("document_results.created_at", `%${search_value}%`)
            .innerJoin("document_results", "document_types.document_type_id", "document_results.document_type_id")
            .count("document_results.document_result_id as jumlah")
            .then((res) => {
            return res[0].jumlah;
        });
        const query = (0, knex_1.default)("document_types");
        if (order_data !== undefined) {
            var column_index = request.body.order[0]["column"];
            var column_name = request.body.columns[column_index]["data"];
            var column_sort_order = request.body.order[0]["dir"];
            query.orderBy(column_name, column_sort_order);
        }
        const data_arr = yield query
            .select("document_results.document_result_id as document_result_id", "document_types.document_type as document_type", "document_results.applicant_name as applicant_name", "document_results.signed as signed", "document_results.created_at as created_at")
            .whereILike("document_types.document_type", `%${search_value}%`)
            .orWhereILike("document_results.applicant_name", `%${search_value}%`)
            .orWhereILike("document_results.created_at", `%${search_value}%`)
            .innerJoin("document_results", "document_types.document_type_id", "document_results.document_type_id")
            .limit(length)
            .offset(start)
            .then((result) => {
            return result.map((document) => {
                return Object.assign(Object.assign({}, document), { created_at: (0, moment_1.default)(document.created_at).format("HH:mm <br> DD MMMM YYYY") });
            });
        });
        let output = {
            draw: draw,
            iTotalRecords: total_records,
            iTotalDisplayRecords: total_records_with_filter,
            aaData: data_arr,
        };
        return response.status(200).send(output);
    }
    catch (error) {
        //console.log(error);
        response.status(400).send(error);
    }
});
exports.getDocumentApi = getDocumentApi;
const createSuratKeteranganDomisiliUsaha = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, validatorjs_1.default)({
            nomor_surat: request.body.nomor_surat,
            nomor_reg: request.body.nomor_reg,
            tanggal_pendirian: request.body.tanggal_pendirian,
            nama: request.body.nama,
            tanggal_lahir: request.body.tanggal_lahir,
            tempat_lahir: request.body.tempat_lahir,
            jenis_kelamin: request.body.jenis_kelamin,
            pekerjaan: request.body.pekerjaan,
            agama: request.body.agama,
            kewarganegaraan: request.body.kewarganegaraan,
            alamat: request.body.alamat,
            nik: request.body.nik,
            perusahaan: request.body.perusahaan,
            jenis_usaha: request.body.jenis_usaha,
            penanggung_jawab: request.body.penanggung_jawab,
            jumlah_karyawan: request.body.jumlah_karyawan,
            lokasi_usaha: request.body.lokasi_usaha,
            status_bangunan: request.body.status_bangunan,
        }, {
            nomor_surat: "required|string|max:128",
            nomor_reg: "required|string|max:128",
            nama: "required|string|max:128",
            tanggal_lahir: "required|string",
            tempat_lahir: "required|string",
            tanggal_pendirian: "required|string",
            jenis_kelamin: "required|string",
            pekerjaan: "required|string|max:128",
            agama: "required|string|max:32",
            kewarganegaraan: "required|string|max:32",
            alamat: "required|string|max:512",
            nik: "required|string|max:16",
            perusahaan: "required|string|max:128",
            jenis_usaha: "required|string|max:64",
            penanggung_jawab: "required|string|max:128",
            jumlah_karyawan: "required|integer",
            lokasi_usaha: "required|string|max:512",
            status_bangunan: "required|string|max:32",
        });
        const tanggal_pendirian_content = (0, moment_1.default)(request.body.tanggal_pendirian, "YYYY-MM-DD").format("DD MMMM YYYY");
        // combine tanggal_lahir and tempat_lahir
        const tanggal_lahir = (0, moment_1.default)(request.body.tanggal_lahir).format("DD MMMM YYYY");
        const tempat_lahir = request.body.tempat_lahir;
        const tempat_tanggal_lahir = tempat_lahir + ", " + tanggal_lahir;
        request.app.render("document-template/surat-keterangan-domisili-usaha", {
            nomor_surat: request.body.nomor_surat,
            tanggal_pendirian: tanggal_pendirian_content,
            nama: request.body.nama,
            tempat_tanggal_lahir: tempat_tanggal_lahir,
            jenis_kelamin: request.body.jenis_kelamin,
            pekerjaan: request.body.pekerjaan,
            agama: request.body.agama,
            kewarganegaraan: request.body.kewarganegaraan,
            alamat: request.body.alamat,
            nik: request.body.nik,
            perusahaan: request.body.perusahaan,
            jenis_usaha: request.body.jenis_usaha,
            penanggung_jawab: request.body.penanggung_jawab,
            jumlah_karyawan: request.body.jumlah_karyawan,
            lokasi_usaha: request.body.lokasi_usaha,
            status_bangunan: request.body.status_bangunan,
            kode_surat: false,
            formulir_judul: "SURAT KETERANGAN DOMISILI USAHA",
            nomor_reg: request.body.nomor_reg,
            created_at: (0, moment_1.default)().format("DD MMMM YYYY"),
        }, (error, html) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            const documentId = (0, uuid_1.v4)();
            yield (0, knex_1.default)("document_results").insert({
                document_result_id: documentId,
                document_type_id: "2b76a6b5-6c9e-4dea-90f8-6eec0183530a",
                nomor_surat: request.body.nomor_surat,
                nik: request.body.nik,
                applicant_name: request.body.nama,
                content: html.replace(/(\r|\n)/g, ""),
                signed: false,
                created_at: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
            });
            return response.status(201).send({ documentId: documentId });
        }));
    }
    catch (error) {
        switch (error === null || error === void 0 ? void 0 : error.code) {
            case "validation-fails":
                return response.status(400).send({
                    code: "validation-fails",
                    errorMessages: error.errorMessages,
                });
            default:
                return response.status(500).send({
                    code: "internal-server-error",
                    errorMessages: "Server Bermasalah",
                });
        }
    }
});
exports.createSuratKeteranganDomisiliUsaha = createSuratKeteranganDomisiliUsaha;
const signDocument = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const villageChief = yield (0, knex_1.default)("village_chiefs")
            .where("is_active", true)
            .limit(1)
            .then((result) => {
            return result[0];
        });
        let document = yield (0, knex_1.default)("document_results")
            .where("document_result_id", request.params.documentResultId)
            .limit(1)
            .then((result) => {
            if (result.length != 1)
                throw { code: "invalid-document-result-id" };
            return result[0];
        });
        document.content = document.content.replace("(village-chief-signature)", villageChief.signature);
        document.content = document.content.replace("(village-chief-name)", villageChief.full_name);
        yield (0, knex_1.default)("document_results")
            .where("document_result_id", request.params.documentResultId)
            .update(Object.assign(Object.assign({}, document), { signed: true }));
        return response
            .status(201)
            .send({ surat_id: request.params.documentResultId });
        // return response.redirect("/documents/" + request.params.documentResultId);
    }
    catch (error) {
        switch (error === null || error === void 0 ? void 0 : error.code) {
            case "invalid-document-result-id":
                return next({
                    httpStatusCode: 404,
                    responseBody: {
                        code: "invalid-document-result-id",
                    },
                });
            default:
                return next({
                    httpStatusCode: 500,
                    responseBody: {
                        code: "internal-server-error",
                        errorMessages: "Server Bermasalah",
                    },
                });
        }
    }
});
exports.signDocument = signDocument;
const createSuratkkF101 = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jumlah_anggota = Object.keys(request.body).length - 6;
    try {
        var kepala_keluarga = "";
        var kepala_keluarga_excuted = false;
        var kepala_keluarga_nik = "";
        yield (0, validatorjs_1.default)({
            no_reg: request.body.no_reg,
            alamat: request.body.alamat,
            rt: request.body.rt,
            rw: request.body.rw,
            dusun: request.body.dusun,
        }, {
            no_reg: "required|string|max:72",
            alamat: "required|string|max:36",
            rt: "required|string|max:36",
            rw: "required|string|max:36",
            dusun: "required|string|max:36",
        });
        let anggota = [];
        for (let index = 0; index < jumlah_anggota; index++) {
            yield (0, validatorjs_1.default)({
                nik: request.body[index].nik,
                nama: request.body[index].nama,
                tempat_lahir: request.body[index].tempat_lahir,
                tanggal_lahir: request.body[index].tanggal_lahir,
                jenis_kelamin: request.body[index].jenis_kelamin,
                pekerjaan: request.body[index].pekerjaan,
                agama: request.body[index].agama,
                status_keluarga: request.body[index].status_keluarga,
                status_pernikahan: request.body[index].status_pernikahan,
                pendidikan_terakhir: request.body[index].pendidikan_terakhir,
                nama_ayah: request.body[index].nama_ayah,
                nama_ibu: request.body[index].nama_ibu,
                nik_ayah: request.body[index].nik_ayah,
                nik_ibu: request.body[index].nik_ibu,
            }, {
                nik: "required|string|max:36",
                nama: "required|string|max:128",
                tempat_lahir: "required|string|max:128",
                tanggal_lahir: "required|string|date",
                jenis_kelamin: "required|string|in:Laki-laki,Perempuan",
                pekerjaan: "required|string|max:128",
                status_keluarga: "required|string|max:20",
                agama: "required|string|in:Islam,Katolik,Kristen,Buddha,Hindu,Konghucu",
                status_pernikahan: "required|string|in:Cerai hidup,Cerai mati,Belum kawin,Kawin",
                pendidikan_terakhir: "required|string|max:50",
                nama_ayah: "required|string|max:36",
                nama_ibu: "required|string|max:36",
                nik_ayah: "required|string|max:36",
                nik_ibu: "required|string|max:36",
            });
            if (request.body[index].status_keluarga === "Kepala Keluarga") {
                if (kepala_keluarga_excuted === true) {
                    console.log(kepala_keluarga);
                    throw Error("Tidak bisa membuat surat keterangan keluarga karena sudah ada kepala keluarga");
                }
                kepala_keluarga_nik = request.body[index].nik;
                kepala_keluarga = request.body[index].nama;
                kepala_keluarga_excuted = true;
            }
            const obj = (0, convert_1.convertEmptyStringsOrNullToStripe)(request.body[index]);
            const checkNik = yield (0, resident_repository_1.getName)(request.body[index].nik);
            if (checkNik) {
                throw Error("Duplicate NIK");
            }
            anggota.push(obj);
        }
        if (kepala_keluarga_excuted === false) {
            throw Error("Data Kepala Keluarga Tidak ada");
        }
        const row1 = anggota.map(({ nama, nik, alamat_sebelumnya, no_paspor, tanggal_berakhir_paspor, }) => ({
            nama,
            nik,
            alamat_sebelumnya,
            no_paspor,
            tanggal_berakhir_paspor,
        }));
        const row2 = anggota.map(({ jenis_kelamin, tempat_lahir, tanggal_lahir, akta_lahir, no_akta_lahir, golongan_darah, agama, status_pernikahan, no_akta_nikah, akta_nikah, tanggal_perkawinan, no_akta_cerai, akta_cerai, tanggal_perceraian, }) => ({
            jenis_kelamin,
            tempat_lahir,
            tanggal_lahir,
            umur: (0, convert_1.convertIntoAge)(tanggal_lahir),
            akta_lahir,
            no_akta_lahir,
            golongan_darah,
            agama,
            status_pernikahan,
            no_akta_nikah,
            akta_nikah,
            tanggal_perkawinan,
            no_akta_cerai,
            akta_cerai,
            tanggal_perceraian,
        }));
        const row3 = anggota.map(({ status_keluarga, kelainan_fisik_mental, penyandang_cacat, pendidikan_terakhir, pekerjaan, nik_ibu, nama_ibu, nik_ayah, nama_ayah, }) => ({
            status_keluarga,
            kelainan_fisik_mental,
            penyandang_cacat,
            pendidikan_terakhir,
            pekerjaan,
            nik_ibu,
            nama_ibu,
            nik_ayah,
            nama_ayah,
        }));
        const ketua_rt = yield (0, knex_1.default)("rt")
            .select("residents.nama")
            .innerJoin("residents", "rt.ketua_rt_nik", "residents.nik")
            .where("rt.rt_id", request.body.rt)
            .then((res) => {
            return res[0].nama;
        });
        const ketua_rw = yield (0, knex_1.default)("rw")
            .select("residents.nama")
            .innerJoin("residents", "rw.ketua_rw_nik", "residents.nik")
            .where("rw.rw_id", request.body.rw)
            .then((res) => {
            return res[0].nama;
        });
        const alamat = yield (0, rt_repository_1.getAlamatByRtId)(request.body.rt).then((result) => {
            if (result.nama_dusun) {
                result.nama_dusun = result.nama_dusun.toUpperCase();
            }
            return result;
        });
        const jumlah_anggota_string = jumlah_anggota
            .toString()
            .padStart(2, "0");
        const res = Object.assign(Object.assign({ no_reg: request.body.no_reg }, alamat), { kepala_keluarga: kepala_keluarga, alamat: request.body.alamat, kode_pos: request.body.kode_pos, jumlah_anggota: jumlah_anggota_string, row1,
            row2,
            row3, petugas: "Nanang Supriyanto", create_at: (0, moment_1.default)().format("DD MMMM YYYY"), ketua_rt: ketua_rt, ketua_rw: ketua_rw });
        request.app.render("document-template/surat-kk-f101", res, (error, html) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            const documentId = (0, uuid_1.v4)();
            yield (0, knex_1.default)("document_results").insert({
                document_result_id: documentId,
                document_type_id: "cde25fb3-ad23-463c-863a-a6f068e3bf6b",
                nik: kepala_keluarga_nik,
                nomor_surat: request.body.no_reg,
                applicant_name: kepala_keluarga,
                content: html.replace(/(\r|\n)/g, ""),
                signed: false,
                created_at: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
            });
            return response.status(201).send({ documentId: documentId });
        }));
    }
    catch (error) {
        //console.log(error);
        switch (error === null || error === void 0 ? void 0 : error.code) {
            case "validation-fails":
                return next({
                    httpStatusCode: 400,
                    responseBody: {
                        code: "validation-fails",
                        errorMessages: error.errorMessages,
                    },
                });
            default:
                return next({
                    httpStatusCode: 500,
                    responseBody: {
                        code: "internal-server-error",
                        errorMessages: error,
                    },
                });
        }
    }
});
exports.createSuratkkF101 = createSuratkkF101;
const createSuratPernyataanSKU = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, validatorjs_1.default)({
            nik: request.body.nik,
            nama: request.body.nama,
            tanggal_lahir: request.body.tanggal_lahir,
            tempat_lahir: request.body.tempat_lahir,
            jenis_kelamin: request.body.jenis_kelamin,
            pekerjaan: request.body.pekerjaan,
            jenis_usaha: request.body.jenis_usaha,
            alamat: request.body.alamat,
            lokasi_usaha: request.body.lokasi_usaha,
        }, {
            nik: "required|string|max:36",
            nama: "required|string|max:128",
            tanggal_lahir: "required|string",
            tempat_lahir: "required|string",
            jenis_kelamin: "required|string",
            pekerjaan: "required|string|max:128",
            jenis_usaha: "required|string|max:128",
            alamat: "required|string|max:512",
            lokasi_usaha: "required|string|max:512",
        });
        // combine tanggal_lahir and tempat_lahir
        const tanggal_lahir = (0, moment_1.default)(request.body.tanggal_lahir).format("DD MMMM YYYY");
        const tempat_lahir = request.body.tempat_lahir;
        const tempat_tanggal_lahir = tempat_lahir + ", " + tanggal_lahir;
        // get rt and rw from families_member table
        const rt_id = yield (0, knex_1.default)("families")
            .select("families.rt_id as rt_id")
            .innerJoin("families_member", "families.no_kk", "families_member.no_kk")
            .where("families_member.nik", request.body.nik)
            .then((res) => {
            return res[0].rt_id;
        });
        // take no_rw and no_rt from rw and rt table
        const rt_rw = (0, rt_repository_1.getAlamatByRtId)(rt_id).then((res) => {
            return res.no_rt + "/" + res.no_rw;
        });
        const ketua_rt = (0, knex_1.default)("rt")
            .select("residents.nama as nama")
            .innerJoin("residents", "rt.ketua_rt_nik", "residents.nik")
            .where("rt_id", rt_id)
            .then((res) => {
            return res[0].nama;
        });
        Promise.all([rt_rw, ketua_rt]).then(([rt_rw, ketua_rt]) => {
            request.app.render("document-template/surat-pernyataan-SKU", {
                formulir_judul: "SURAT PERNYATAAN SKU",
                nomor_surat: false,
                kode_surat: false,
                nama: request.body.nama,
                jenis_kelamin: request.body.jenis_kelamin,
                tempat_tanggal_lahir: tempat_tanggal_lahir,
                pekerjaan: request.body.pekerjaan,
                alamat: request.body.alamat,
                alamat_usaha: request.body.lokasi_usaha,
                jenis_usaha: request.body.jenis_usaha,
                rt_rw: rt_rw,
                ketua_rt: ketua_rt,
                created_at: (0, moment_1.default)().format("DD MMM YYYY"),
            }, (error, html) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    throw error;
                const documentId = (0, uuid_1.v4)();
                yield (0, knex_1.default)("document_results").insert({
                    document_result_id: documentId,
                    document_type_id: "eb9ddbbf-d970-4c8f-9c87-800a3761a1d6",
                    applicant_name: request.body.nama,
                    nik: request.body.nik,
                    content: html.replace(/(\r|\n)/g, ""),
                    signed: true,
                    created_at: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
                });
                return response.status(201).send({ documentId: documentId });
            }));
        });
    }
    catch (error) {
        switch (error === null || error === void 0 ? void 0 : error.code) {
            case "validation-fails":
                return response.status(400).send({
                    code: "validation-fails",
                    errorMessages: error.errorMessages,
                });
            default:
                return response.status(500).send({
                    code: "internal-server-error",
                    errorMessages: "Server Bermasalah",
                });
        }
    }
});
exports.createSuratPernyataanSKU = createSuratPernyataanSKU;
const createSuratKeteranganUsaha = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, validatorjs_1.default)({
            nama: request.body.nama,
            tanggal_lahir: request.body.tanggal_lahir,
            tempat_lahir: request.body.tempat_lahir,
            jenis_kelamin: request.body.jenis_kelamin,
            pekerjaan: request.body.pekerjaan,
            alamat: request.body.alamat,
            lokasi_usaha: request.body.lokasi_usaha,
        }, {
            nama: "required|string|max:128",
            tanggal_lahir: "required|string",
            tempat_lahir: "required|string",
            jenis_kelamin: "required|string",
            pekerjaan: "required|string|max:128",
            alamat: "required|string|max:512",
            lokasi_usaha: "required|string|max:512",
        });
        const tanggal_lahir = (0, moment_1.default)(request.body.tanggal_lahir).format("DD MMMM YYYY");
        const tempat_lahir = request.body.tempat_lahir;
        const tempat_tanggal_lahir = tempat_lahir + ", " + tanggal_lahir;
        request.app.render("document-template/surat-pernyataan-SKU", {
            formulir_judul: "SURAT PERNYATAAN SKU",
            nomor_surat: false,
            kode_surat: false,
            nama: request.body.nama,
            jenis_kelamin: request.body.jenis_kelamin,
            tempat_tanggal_lahir: tempat_tanggal_lahir,
            pekerjaan: request.body.pekerjaan,
            alamat: request.body.alamat,
            alamat_usaha: request.body.lokasi_usaha,
            jenis_usaha: request.body.jenis_usaha,
            created_at: (0, moment_1.default)().format("DD MMMM YYYY"),
        }, (error, html) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            const documentId = (0, uuid_1.v4)();
            yield (0, knex_1.default)("document_results").insert({
                document_result_id: documentId,
                document_type_id: "eb9ddbbf-d970-4c8f-9c87-800a3761a1d6",
                applicant_name: request.body.nama,
                content: html.replace(/(\r|\n)/g, ""),
                signed: true,
                created_at: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
            });
            return response.status(201).send({ documentId: documentId });
        }));
    }
    catch (error) {
        switch (error === null || error === void 0 ? void 0 : error.code) {
            case "validation-fails":
                return next({
                    httpStatusCode: 400,
                    responseBody: {
                        code: "validation-fails",
                        errorMessages: error.errorMessages,
                    },
                });
            default:
                return next({
                    httpStatusCode: 500,
                    responseBody: {
                        code: "internal-server-error",
                        errorMessages: "Server Bermasalah",
                    },
                });
        }
    }
});
exports.createSuratKeteranganUsaha = createSuratKeteranganUsaha;
const createSKKMRumahSakit = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, validatorjs_1.default)({
            formulir_judul: request.body.formulir_judul,
            nomor_reg: request.body.nomor_reg,
            nomor_surat: request.body.nomor_surat,
            nama: request.body.nama,
            tanggal_lahir: request.body.tanggal_lahir,
            tempat_lahir: request.body.tempat_lahir,
            jenis_kelamin: request.body.jenis_kelamin,
            rumahSakit: request.body.rumahSakit,
            tanggal_surat_keterangan: request.body.tanggalSuratKeterangan,
            alamat: request.body.alamat,
            nik: request.body.nik,
        }, {
            nomor_reg: "required|string|max:128",
            nomor_surat: "required|string|max:128",
            formulir_judul: "required|string|max:128",
            nama: "required|string|max:128",
            tanggal_lahir: "required|string",
            tempat_lahir: "required|string",
            jenis_kelamin: "required|string",
            tanggal_surat_keterangan: "required|string",
            rumahSakit: "required|string|max:128",
            alamat: "required|string|max:512",
            nik: "required|string|max:512",
        });
        const tanggal_surat_keterangan = (0, moment_1.default)(request.body.tanggalSuratKeterangan, "YYYY-MM-DD").format("dddd DD MMMM YYYY");
        // take alamat and rt_id from families_member table
        const alamat_rt_id = yield (0, knex_1.default)("families")
            .select("families.alamat as alamat", "families.rt_id as rt_id")
            .innerJoin("families_member", "families.no_kk", "families_member.no_kk")
            .where("families_member.nik", request.body.nik)
            .then((res) => {
            return res[0];
        });
        // take no_rw and no_rt from rw and rt table
        const rt_rw = yield (0, rt_repository_1.getAlamatByRtId)(alamat_rt_id.rt_id);
        const alamat_rt_rw = alamat_rt_id.alamat + " RT " + rt_rw.no_rt + "/" + rt_rw.no_rw;
        const tanggal_lahir = (0, moment_1.default)(request.body.tanggal_lahir).format("DD MMMM YYYY");
        const tempat_lahir = request.body.tempat_lahir;
        const tempat_tanggal_lahir = tempat_lahir + ", " + tanggal_lahir;
        request.app.render("document-template/skkm-rumah-sakit", {
            formulir_judul: request.body.formulir_judul,
            nomor_surat: request.body.nomor_surat,
            kode_surat: false,
            no_reg: request.body.nomor_reg,
            nama: request.body.nama,
            jenis_kelamin: request.body.jenis_kelamin,
            tempat_tanggal_lahir: tempat_tanggal_lahir,
            alamat_rt_rw: alamat_rt_rw,
            rumah_sakit: request.body.rumahSakit,
            alamat: request.body.alamat,
            nik: request.body.nik,
            hari_tanggal_keterangan: tanggal_surat_keterangan,
            created_at: (0, moment_1.default)().format("DD MMM YYYY"),
        }, (error, html) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            const documentId = (0, uuid_1.v4)();
            yield (0, knex_1.default)("document_results").insert({
                document_result_id: documentId,
                nomor_surat: request.body.nomor_reg,
                document_type_id: "8b963d84-b2a2-43cb-9e9a-e7892905d7f3",
                nik: request.body.nik,
                applicant_name: request.body.nama,
                content: html.replace(/(\r|\n)/g, ""),
                signed: false,
                created_at: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
            });
            return response.status(201).send({ documentId: documentId });
        }));
    }
    catch (error) {
        switch (error === null || error === void 0 ? void 0 : error.code) {
            case "validation-fails":
                return response.status(400).send({
                    code: "validation-fails",
                    errorMessages: error.errorMessages,
                });
            default:
                return response.status(500).send({
                    code: "internal-server-error",
                    errorMessages: "Server Bermasalah",
                });
        }
    }
});
exports.createSKKMRumahSakit = createSKKMRumahSakit;
const createSKKMSekolah = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, validatorjs_1.default)({
            nomor_surat: request.body.nomor_surat,
            formulir_judul: request.body.formulir_judul,
            nama: request.body.nama,
            tanggal_lahir: request.body.tanggal_lahir,
            tempat_lahir: request.body.tempat_lahir,
            jenis_kelamin: request.body.jenis_kelamin,
            pekerjaan: request.body.pekerjaan,
            agama: request.body.agama,
            kewarganegaraan: request.body.kewarganegaraan,
            alamat: request.body.alamat,
            nik: request.body.nik,
            status_keluarga: request.body.status_keluarga,
            asal_sekolah: request.body.asal_sekolah,
        }, {
            nomor_surat: "required|string|max:128",
            formulir_judul: "required|string|max:56",
            nama: "required|string|max:128",
            tanggal_lahir: "required|string",
            tempat_lahir: "required|string",
            jenis_kelamin: "required|string",
            pekerjaan: "required|string|max:128",
            agama: "required|string|max:32",
            kewarganegaraan: "required|string|max:32",
            alamat: "required|string|max:512",
            nik: "required|string|max:16",
            status_keluarga: "required|string|max:128",
            asal_sekolah: "required|string|max:64",
        });
        const tanggal_lahir = (0, moment_1.default)(request.body.tanggal_lahir).format("DD MMMM YYYY");
        const tempat_lahir = request.body.tempat_lahir;
        const tempat_tanggal_lahir = tempat_lahir + ", " + tanggal_lahir;
        request.app.render("document-template/skkm-sekolah", {
            nomor_surat: request.body.nomor_surat,
            nama: request.body.nama,
            tanggal_lahir: request.body.tanggal_lahir,
            tempat_tanggal_lahir: tempat_tanggal_lahir,
            jenis_kelamin: request.body.jenis_kelamin,
            pekerjaan: request.body.pekerjaan,
            warga_negara: request.body.kewarganegaraan,
            tempat_tinggal: request.body.alamat,
            nik: request.body.nik,
            asal_sekolah: request.body.asal_sekolah,
            status_agama: request.body.status_keluarga + "/" + request.body.agama,
            kode_surat: false,
            formulir_judul: request.body.formulir_judul,
            created_at: (0, moment_1.default)().format("DD MMMM YYYY"),
        }, (error, html) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            const documentId = (0, uuid_1.v4)();
            yield (0, knex_1.default)("document_results").insert({
                document_result_id: documentId,
                document_type_id: "bde3a863-a632-4d63-b155-3c2896d3e989",
                nomor_surat: request.body.nomor_surat,
                nik: request.body.nik,
                applicant_name: request.body.nama,
                content: html.replace(/(\r|\n)/g, ""),
                signed: false,
                created_at: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
            });
            return response.status(201).send({ documentId: documentId });
        }));
    }
    catch (error) {
        switch (error === null || error === void 0 ? void 0 : error.code) {
            case "validation-fails":
                return response.status(400).send({
                    code: "validation-fails",
                    errorMessages: error.errorMessages,
                });
            default:
                return response.status(500).send({
                    code: "internal-server-error",
                    errorMessages: "Server Bermasalah",
                });
        }
    }
});
exports.createSKKMSekolah = createSKKMSekolah;

import { Request, Response } from "express";
import knex from "../../utilities/knex";
// import convertToTitleCase from "../../utilities/convert";
// import checkFileExists from "../../utilities/existfile";
import htmlToPdf from "../../utilities/htmlToPdf";
import { getAlamatByRtId } from "../../repository/rt-repository";
import moment from "moment";
moment.locale("id");

export const getDocumentAll = (request: Request, response: Response) => {
  return response.render("pages/data/index/list-surat");
};
export const viewSurat = async (request: Request, response: Response) => {
  const document_result_id = request.params.documentResultId;
  var pdf;
  try {
    const surat = await knex("document_results")
      .select("document_result_id", "document_type_id", "content", "signed")
      .where("document_result_id", document_result_id)
      .then((res) => {
        return res[0];
      });
    // console.log(surat);

    pdf = await htmlToPdf(surat["content"]);
    response.contentType("application/pdf");
    return response.status(200).send(pdf);
  } catch (error) {
    //console.log(error);
  }
};

export const createSuratKeteranganDomisiliUsaha = (
  request: Request,
  response: Response
) => {
  return response.render(
    "pages/document/form/surat-keterangan-domisili-usaha",
    { formulir_judul: "SURAT KETERANGAN DOMISILI USAHA" }
  );
};

export const createSKKMRumahSakit = (request: Request, response: Response) => {
  return response.render("pages/document/form/skkm-rumah-sakit", {
    formulir_judul: "SURAT KETERANGAN KELUARGA MISKIN/TIDAK MAMPU",
  });
};

export const createSKKMSekolah = (request: Request, response: Response) => {
  return response.render("pages/document/form/skkm-sekolah", {
    formulir_judul: "SURAT KETERANGAN KELUARGA MISKIN/TIDAK MAMPU",
  });
};

export const createSuratPernyataanSKU = (
  request: Request,
  response: Response
) => {
  return response.render("pages/document/form/surat-pernyataan-SKU", {
    formulir_judul: "SURAT PERNYATAAN SKU",
  });
};

export const createSuratKKf101 = (request: Request, response: Response) => {
  return response.render("pages/document/form/surat-kk-f101", {
    formulir_judul: "FORMULIR ISIAN BIODATA PENDUDUK UNTUK WNI ( PERKELUARGA )",
  });
};

import { Request, Response } from "express";
import knex from "../../utilities/knex";
// import htmlToPdf from "../../utilities/htmlToPdf";
import moment from "moment";
moment().local();
moment.locale("id");

export const getDocumentAll = (request: Request, response: Response) => {
  return response.render("pages/data/index/list-surat");
};
export const viewSurat = async (request: Request, response: Response) => {
  const document_result_id = request.params.documentResultId;
  try {
    const surat = await knex("document_results")
      .select("document_result_id", "document_type_id", "content", "signed")
      .where("document_result_id", document_result_id)
      .then((res) => {
        return res[0];
      });
    let isi = surat["content"];
    isi = isi.replaceAll("(base_url)", String(process.env.BASE_URL_ONLINE));
    isi = isi.replace("</body>", "<script> window.print() </script></body>");
    response.status(200).send(isi);
  } catch (error) {
    console.log(error);
    response.status(500).send({ errorMessage: error });
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

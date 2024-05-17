import express from "express";
import * as documentController from "../../controllers/web/documents-controller";

const router = express.Router();

router.get("/", documentController.getDocumentAll);
router.get("/result/:documentResultId", documentController.viewSurat);
router.get(
  "/surat-keterangan-domisili-usaha/create",
  documentController.createSuratKeteranganDomisiliUsaha
);
// router.get("/:surat/create", documentController.createSurat);

router.get(
  "/surat-pernyataan-SKU/create",
  documentController.createSuratPernyataanSKU
);
router.get("/surat-KK-f101/create", documentController.createSuratKKf101);

router.get("/skkm-rumah-sakit/create", documentController.createSKKMRumahSakit);

router.get("/skkm-sekolah/create", documentController.createSKKMSekolah);

export default router;

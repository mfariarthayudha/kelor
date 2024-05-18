import express from "express";
import * as documentController from "../../controllers/web/documents-controller";
import { checkRole } from "../../middlewares/auth-role";

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
  checkRole("Admin"),
  documentController.createSuratPernyataanSKU
);
router.get(
  "/surat-KK-f101/create",
  checkRole("Admin"),
  documentController.createSuratKKf101
);

router.get(
  "/skkm-rumah-sakit/create",
  checkRole("Admin"),
  documentController.createSKKMRumahSakit
);

router.get(
  "/skkm-sekolah/create",
  checkRole("Admin"),
  documentController.createSKKMSekolah
);

export default router;

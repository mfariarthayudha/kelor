import express from "express";
import { checkRole } from "../../middlewares/auth-role";

import * as documentController from "../../controllers/api/document-controller";

const router = express.Router();

router.post("/document-type", documentController.addDocumentType);
router.put(
  "/document-type/:documentTypeId",
  documentController.updateDocumentType
);

router.post(
  "/2b76a6b5-6c9e-4dea-90f8-6eec0183530a",
  documentController.createSuratKeteranganDomisiliUsaha
);
router.put(
  "/:documentResultId/sign",
  checkRole("Kepala Desa"),
  documentController.signDocument
);
// router.get("/:documentResultId/sign", documentController.signDocument);
router.post(
  "/eb9ddbbf-d970-4c8f-9c87-800a3761a1d6",
  documentController.createSuratPernyataanSKU
);

router.post(
  "/8b963d84-b2a2-43cb-9e9a-e7892905d7f3",
  documentController.createSKKMRumahSakit
);

router.post(
  "/bde3a863-a632-4d63-b155-3c2896d3e989",
  documentController.createSKKMSekolah
);

router.post("/", documentController.getDocument);

router.post(
  "/cde25fb3-ad23-463c-863a-a6f068e3bf6b",
  documentController.createSuratkkF101
);
router.delete(
  "/:documentResultId",
  checkRole("Admin"),
  documentController.removeDocumentResult
);

// router.get("/tes", documentController.tesGetDocument);
export default router;

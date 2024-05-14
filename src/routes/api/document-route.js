"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const documentController = __importStar(require("../../controllers/api/document-controller"));
const router = express_1.default.Router();
router.post("/document-type", documentController.addDocumentType);
router.put("/document-type/:documentTypeId", documentController.updateDocumentType);
router.post("/2b76a6b5-6c9e-4dea-90f8-6eec0183530a", documentController.createSuratKeteranganDomisiliUsaha);
router.put("/:documentResultId/sign", documentController.signDocument);
router.get("/:documentResultId/sign", documentController.signDocument);
router.post("/eb9ddbbf-d970-4c8f-9c87-800a3761a1d6", documentController.createSuratPernyataanSKU);
router.post("/8b963d84-b2a2-43cb-9e9a-e7892905d7f3", documentController.createSKKMRumahSakit);
router.post("/bde3a863-a632-4d63-b155-3c2896d3e989", documentController.createSKKMSekolah);
router.post("/", documentController.getDocument);
router.post("/cde25fb3-ad23-463c-863a-a6f068e3bf6b", documentController.createSuratkkF101);
router.delete("/:documentResultId", documentController.removeDocumentResult);
// router.get("/tes", documentController.tesGetDocument);
exports.default = router;

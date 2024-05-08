import express from "express";
import * as familyController from "../../controllers/web/family-controller";

const router = express.Router();
router.get("/create", express.json(), familyController.familyAdd);
router.get("/", express.json(), familyController.getFamilyAll);
router.get("/:no_kk/edit", familyController.familyUpdate);

export default router;

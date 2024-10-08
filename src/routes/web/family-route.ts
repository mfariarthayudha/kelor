import express from "express";
import * as familyController from "../../controllers/web/family-controller";
import { checkRole } from "../../middlewares/auth-role";

const router = express.Router();
router.get("/create", checkRole("Admin"), familyController.familyAdd);
router.get("/", express.json(), familyController.getFamilyAll);
router.get("/:no_kk/edit", familyController.familyUpdate);

export default router;

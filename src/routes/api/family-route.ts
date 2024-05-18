import express from "express";
import { checkRole } from "../../middlewares/auth-role";
import * as familyController from "../../controllers/api/family-controller";

const router = express.Router();

router.post("/create", checkRole("Admin"), familyController.createFamily);
router.get("/:no_kk", familyController.getFamily);
router.post("/check", familyController.checkNoKK);
router.put("/:no_kk/update", checkRole("Admin"), familyController.updateFamily);
router.delete("/:no_kk", checkRole("Admin"), familyController.RemoveFamily);

export default router;

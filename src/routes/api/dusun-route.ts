import express from "express";
import { checkRole } from "../../middlewares/auth-role";
import * as dusunController from "../../controllers/api/dusun-controller";

const router = express.Router();

router.get("/", dusunController.getDusunName);
router.post("/create", checkRole("Admin"), dusunController.dusunAdd);
router.put("/:dusunId/update", checkRole("Admin"), dusunController.dusunUpdate);
router.delete("/:dusunId", checkRole("Admin"), dusunController.dusunRemove);

export default router;

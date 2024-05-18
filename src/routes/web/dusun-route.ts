import express from "express";
import { checkRole } from "../../middlewares/auth-role";
import * as dusunController from "../../controllers/web/dusun-controller";

const router = express.Router();

router.get("/", dusunController.getAllDusun);
router.get("/create", checkRole("Admin"), dusunController.dusunAdd);
router.get("/:dusunId/edit", dusunController.dusunUpdate);

export default router;

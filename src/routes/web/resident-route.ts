import express from "express";
import { checkRole } from "../../middlewares/auth-role";
import * as residentController from "../../controllers/web/resident-controller";

const router = express.Router();

router.get("/", residentController.getresidentAll);
router.get("/create", checkRole("Admin"), residentController.residentAdd);
router.get("/:nik/edit", residentController.residentUpdate);
export default router;

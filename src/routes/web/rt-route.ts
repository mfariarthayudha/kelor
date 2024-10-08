import express from "express";
import { checkRole } from "../../middlewares/auth-role";
import * as rtController from "../../controllers/web/rt-controller";

const router = express.Router();
router.get("/", rtController.getAllRt);
router.get("/create", checkRole("Admin"), rtController.rtAdd);
router.get("/:rtId/edit", rtController.rtUpdate);
router.get("/tes/tes", rtController.tesAja);

export default router;

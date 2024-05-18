import express from "express";
import { checkRole } from "../../middlewares/auth-role";
import * as rtController from "../../controllers/api/rt-controller";

const router = express.Router();

router.get("/rw/:rwId", rtController.getRtName);
router.post("/create", checkRole("Admin"), rtController.rtAdd);
router.put("/:rtId/update", checkRole("Admin"), rtController.rtUpdate);
router.delete("/:rtId", checkRole("Admin"), rtController.rtRemove);

export default router;

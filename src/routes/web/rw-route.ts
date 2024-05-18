import express from "express";
import { checkRole } from "../../middlewares/auth-role";
import * as rwController from "../../controllers/web/rw-controller";

const router = express.Router();

router.get("/", rwController.getAllRw);
router.get("/create", checkRole("Admin"), rwController.addRw);
router.get("/:rwId/edit", rwController.updateRw);
export default router;

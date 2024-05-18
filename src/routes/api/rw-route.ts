import express from "express";
import { checkRole } from "../../middlewares/auth-role";
import * as rwController from "../../controllers/api/rw-controller";

const router = express.Router();

router.get("/dusun/:dusunId", express.json(), rwController.getRwName);
// router.get("/:noRw/dusun/:dusunId", express.json(), rwController.checkNoRW);
router.post("/create", checkRole("Admin"), rwController.createRw);
router.put("/:rwId/update", checkRole("Admin"), rwController.rwUpdate);
router.delete("/:rwId", checkRole("Admin"), rwController.rwRemove);

export default router;

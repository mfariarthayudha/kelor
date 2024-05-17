import express from "express";

import * as rwController from "../../controllers/api/rw-controller";

const router = express.Router();

router.get("/dusun/:dusunId", express.json(), rwController.getRwName);
// router.get("/:noRw/dusun/:dusunId", express.json(), rwController.checkNoRW);
router.post("/create", express.json(), rwController.createRw);
router.put("/:rwId/update", rwController.rwUpdate);
router.delete("/:rwId", rwController.rwRemove);

export default router;

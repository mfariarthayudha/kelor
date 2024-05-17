import express from "express";

import * as rtController from "../../controllers/api/rt-controller";

const router = express.Router();

router.get("/rw/:rwId", rtController.getRtName);
router.post("/create", rtController.rtAdd);
router.put("/:rtId/update", rtController.rtUpdate);
router.delete("/:rtId", rtController.rtRemove);

export default router;

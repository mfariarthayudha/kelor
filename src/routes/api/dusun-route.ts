import express from "express";

import * as dusunController from "../../controllers/api/dusun-controller";

const router = express.Router();

router.get("/", express.json(), dusunController.getDusunName);
router.post("/create", express.json(), dusunController.dusunAdd);
router.put("/:dusunId/update", express.json(), dusunController.dusunUpdate);
router.delete("/:dusunId", dusunController.dusunRemove);

export default router;

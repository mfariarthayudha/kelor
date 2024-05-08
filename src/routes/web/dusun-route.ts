import express from "express";

import * as dusunController from "../../controllers/web/dusun-controller";

const router = express.Router();

router.get("/", dusunController.getAllDusun);
router.get("/create", dusunController.dusunAdd);
router.get("/:dusunId/edit", dusunController.dusunUpdate);

export default router;

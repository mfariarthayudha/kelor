import express from "express";

import * as rwController from "../../controllers/web/rw-controller";

const router = express.Router();

router.get("/", rwController.getAllRw);
router.get("/create", rwController.addRw);
router.get("/:rwId/edit", rwController.updateRw);
export default router;

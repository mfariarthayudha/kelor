import express from "express";

import * as familyController from "../../controllers/api/family-controller";

const router = express.Router();

router.post("/create", express.json(), familyController.createFamily);
router.get("/:no_kk", express.json(), familyController.getFamily);
router.post("/check", express.json(), familyController.checkNoKK);
router.put("/:no_kk/update", express.json(), familyController.updateFamily);
router.delete("/:no_kk", express.json(), familyController.RemoveFamily);

export default router;

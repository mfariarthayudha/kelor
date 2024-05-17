import express from "express";

import * as residentController from "../../controllers/api/resident-controller";

const router = express.Router();

router.get("/:nik", express.json(), residentController.getResidentByNik);
router.post("/create", express.json(), residentController.addResident);
router.put("/:nik/update", residentController.updateResident);
router.delete("/:nik", residentController.residentRemove);
router.get("/:nik/name", residentController.getResidentName);

export default router;

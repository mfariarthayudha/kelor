import express from "express";
import { checkRole } from "../../middlewares/auth-role";
import * as residentController from "../../controllers/api/resident-controller";

const router = express.Router();

router.get("/:nik", express.json(), residentController.getResidentByNik);
router.post("/create", checkRole("Admin"), residentController.addResident);
router.put(
  "/:nik/update",
  checkRole("Admin"),
  residentController.updateResident
);
router.delete("/:nik", checkRole("Admin"), residentController.residentRemove);
router.get("/:nik/name", residentController.getResidentName);

export default router;

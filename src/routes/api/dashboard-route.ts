import express from "express";

import * as dashboardController from "../../controllers/api/dashboard-controller";

const router = express.Router();

router.get("/today", express.json(), dashboardController.today);
router.get("/monthly", express.json(), dashboardController.monthly);
router.get("/annual", express.json(), dashboardController.annual);

export default router;

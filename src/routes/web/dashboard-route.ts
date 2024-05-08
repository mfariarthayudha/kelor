import express from "express";

import * as dashboardController from "../../controllers/web/dashboard-controller";

const router = express.Router();

router.get("/", dashboardController.dashboard);

export default router;

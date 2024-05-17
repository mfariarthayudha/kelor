import express from "express";

import * as accountController from "../../controllers/web/account-controller";

const router = express.Router();

router.get("/", accountController.viewAccount);

export default router;

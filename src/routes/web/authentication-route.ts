import express from "express";

import * as authenticationController from "../../controllers/web/authentication-controller";

const router = express.Router();

router.get("/login", authenticationController.login);
router.get("/logout", authenticationController.logout);

export default router;

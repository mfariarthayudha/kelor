import express from "express";

import * as authenticationController from "../../controllers/api/authentication-controller";

const router = express.Router();

router.post("/login", express.json(), authenticationController.login);

export default router;

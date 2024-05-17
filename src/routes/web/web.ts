import express from "express";

import authenticationRoute from "./authentication-route";
import dashboardRoute from "./dashboard-route";
import documentRoute from "./document-route";
import residentRoute from "./resident-route";
import familyRoute from "./family-route";
import dusunRoute from "./dusun-route";
import rwRoute from "./rw-route";
import rtRoute from "./rt-route";
import accountRoute from "./account-route";
import signatureRoute from "./signature-route";
import mustAuthenticated from "../../middlewares/must-authenticated";

import errorRoute from "./error-route";

const router = express.Router();
router.use("/authentication", authenticationRoute);

router.use(mustAuthenticated);

router.use("/signature", signatureRoute);
router.use("/", dashboardRoute);
router.use("/account", accountRoute);
router.use("/documents", documentRoute);
router.use("/residents", residentRoute);
router.use("/families", familyRoute);
router.use("/dusun", dusunRoute);
router.use("/rw", rwRoute);
router.use("/rt", rtRoute);
router.use("/error", errorRoute);

export default router;

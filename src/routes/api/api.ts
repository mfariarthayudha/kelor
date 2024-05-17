import express, { Request, Response, NextFunction } from "express";

import authenticationRoute from "./authentication-route";
import documentRoute from "./document-route";
import residentRoute from "./resident-route";
import familyRoute from "./family-route";
import rtRoute from "./rt-route";
import rwRoute from "./rw-route";
import dusunRoute from "./dusun-route";
import mustAuthenticated from "../../middlewares/must-authenticated";
const router = express.Router();

router.use("/authentication", authenticationRoute);
router.use(mustAuthenticated);
router.use("/documents", documentRoute);
router.use("/residents", residentRoute);
router.use("/families", familyRoute);
router.use("/rt", rtRoute);
router.use("/rw", rwRoute);
router.use("/dusun", dusunRoute);

router.use(
  (error: any, request: Request, response: Response, next: NextFunction) => {
    //console.log(error);

    return response
      .status(error.httpStatusCode || 500)
      .send(error.responseBody || { code: "internal-server-error" });
  }
);

export default router;

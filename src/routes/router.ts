import express, { Request, Response, NextFunction } from "express";

import expressSession from "../middlewares/express-session";

import apiRouter from "./api/api";
import webRouter from "./web/web";

const router = express.Router();

router.use(expressSession);

router.use((request: Request, response: Response, next: NextFunction) => {
  if (request.method == "GET") return next();

  console.log(
    `A new request received at [${request.method}] ${request.originalUrl}`
  );
  console.log(`Request body : \n`, request.body);

  return next();
});

router.use("/api", apiRouter);
router.use("/", webRouter);

export default router;

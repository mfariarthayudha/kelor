import path from "path";
import * as dotenv from "dotenv";
import express from "express";
import Helmet from "helmet";

import bodyParser from "body-parser";
import { renderFile } from "ejs";

dotenv.config({ path: path.join(__dirname, "./.env.kelor") });

import router from "./src/routes/router";

const application = express();
application.use(Helmet.frameguard({ action: "deny" }));
application.use(Helmet.xssFilter());
application.locals.baseUrl = process.env.BASE_URL_LOCAL;

application.engine("html", renderFile);

application.set("view engine", "html");
application.set("views", path.join(__dirname, "src/resources/views"));

application.use(express.static(path.join(__dirname, "public")));
application.use("/photos", express.static(path.join(__dirname, "signature")));
application.use(express.json());
application.use(bodyParser.urlencoded({ extended: true }));
application.use(function (req, res, next) {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});
application.use(router);

application.listen(process.env.PORT, () => {
  console.log(`Url : http://${process.env.BASE_URL_LOCAL}:${process.env.PORT}`);
});

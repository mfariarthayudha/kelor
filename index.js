"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const ejs_1 = require("ejs");
dotenv.config({ path: path_1.default.join(__dirname, "./.env.kelor") });
const router_1 = __importDefault(require("./src/routes/router"));
const application = (0, express_1.default)();
application.use(helmet_1.default.frameguard({ action: "deny" }));
application.use(helmet_1.default.xssFilter());
application.locals.baseUrl = process.env.BASE_URL_LOCAL;
application.engine("html", ejs_1.renderFile);
application.set("view engine", "html");
application.set("views", path_1.default.join(__dirname, "src/resources/views"));
application.use(express_1.default.static(path_1.default.join(__dirname, "public")));
application.use(express_1.default.json());
application.use(body_parser_1.default.urlencoded({ extended: true }));
application.use(function (req, res, next) {
    res.set("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
    next();
});
application.use(router_1.default);
application.listen(process.env.PORT, () => {
    console.log(`Url : http://${process.env.BASE_URL_LOCAL}:${process.env.PORT}`);
});

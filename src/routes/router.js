"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("../middlewares/express-session"));
const api_1 = __importDefault(require("./api/api"));
const web_1 = __importDefault(require("./web/web"));
const router = express_1.default.Router();
router.use(express_session_1.default);
router.use((request, response, next) => {
    if (request.method == "GET")
        return next();
    console.log(`A new request received at [${request.method}] ${request.originalUrl}`);
    console.log(`Request body : \n`, request.body);
    return next();
});
router.use("/api", api_1.default);
router.use("/", web_1.default);
exports.default = router;

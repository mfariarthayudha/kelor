"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_route_1 = __importDefault(require("./authentication-route"));
const document_route_1 = __importDefault(require("./document-route"));
const resident_route_1 = __importDefault(require("./resident-route"));
const family_route_1 = __importDefault(require("./family-route"));
const rt_route_1 = __importDefault(require("./rt-route"));
const rw_route_1 = __importDefault(require("./rw-route"));
const dusun_route_1 = __importDefault(require("./dusun-route"));
const must_authenticated_1 = __importDefault(require("../../middlewares/must-authenticated"));
const router = express_1.default.Router();
router.use("/authentication", authentication_route_1.default);
router.use(must_authenticated_1.default);
router.use("/documents", document_route_1.default);
router.use("/residents", resident_route_1.default);
router.use("/families", family_route_1.default);
router.use("/rt", rt_route_1.default);
router.use("/rw", rw_route_1.default);
router.use("/dusun", dusun_route_1.default);
router.use((error, request, response, next) => {
    //console.log(error);
    return response
        .status(error.httpStatusCode || 500)
        .send(error.responseBody || { code: "internal-server-error" });
});
exports.default = router;

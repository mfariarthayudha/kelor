"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
exports.default = (request, response, next) => {
    // @ts-ignore
    // console.log(next());
    if (lodash_1.default.isNil(request.session.user)) {
        // if (request.accepts("application/json")) {
        //   return next({
        //     httpStatusCode: 401,
        //     responseBody: {
        //       code: "unauthenticated",
        //     },
        //   });
        // }
        return response.redirect("/authentication/login");
    }
    return next();
};

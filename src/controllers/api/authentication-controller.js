"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const validatorjs_1 = __importDefault(require("../../utilities/validatorjs"));
const knex_1 = __importDefault(require("../../utilities/knex"));
const login = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, validatorjs_1.default)({
            username: request.body.username,
            password: request.body.password,
        }, {
            username: "required|string",
            password: "required|string",
        });
        const user = yield (0, knex_1.default)("users")
            .where("username", request.body.username)
            .limit(1)
            .then((result) => {
            if (result.length < 1) {
                throw { code: "user-not-found" };
            }
            return result[0];
        });
        if ((yield bcrypt_1.default.compare(request.body.password, user.password)) ==
            false) {
            throw { code: "invalid-password" };
        }
        // @ts-ignore
        request.session.user = {
            userId: user.user_id,
            username: user.username,
            role: user.role,
        };
        return response.status(204).send();
    }
    catch (error) {
        switch (error.code) {
            case "validation-fails":
                return next({
                    httpStatusCode: 400,
                    responseBody: {
                        code: "validation-fails",
                        errorMessages: error.errorMessages,
                    },
                });
            case "user-not-found":
                return next({
                    httpStatusCode: 401,
                    responseBody: { code: "user-not-found" },
                });
            case "invalid-password":
                return next({
                    httpStatusCode: 401,
                    responseBody: { code: "invalid-password" },
                });
        }
    }
});
exports.login = login;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const login = (request, response) => {
    if (request.session.user != undefined) {
        return response.redirect("/");
    }
    return response.render("pages/authentication/login", {
        pageTitle: "Masuk | Kelor",
    });
};
exports.login = login;
const logout = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    request.session.destroy(function (error) {
        if (error) {
            next(error);
        }
    });
    return response.redirect("/authentication/login");
});
exports.logout = logout;

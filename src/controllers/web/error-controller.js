"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error404 = void 0;
// import knex from "../../utilities/knex"
const error404 = (request, response) => {
    return response.render("pages/error/404");
};
exports.error404 = error404;

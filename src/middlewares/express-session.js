"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const connect_session_knex_1 = __importDefault(require("connect-session-knex"));
const knex_1 = __importDefault(require("../utilities/knex"));
const knexSessionStore = (0, connect_session_knex_1.default)(express_session_1.default);
const store = new knexSessionStore({
    knex: knex_1.default,
    tablename: "sessions", // optional. Defaults to 'sessions'
});
exports.default = (0, express_session_1.default)({
    name: "kelor",
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET_KEY,
    cookie: {
        httpOnly: true,
        maxAge: 7200000,
        path: "/",
        secure: false,
    },
    store,
});

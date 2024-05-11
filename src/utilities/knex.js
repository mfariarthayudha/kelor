"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("knex");
exports.default = (0, knex_1.knex)({
    client: process.env.DATABASE_CLIENT,
    connection: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    },
});

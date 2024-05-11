"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validatorjs_1 = __importDefault(require("validatorjs"));
exports.default = (data, rules) => {
    return new Promise((resolve, reject) => {
        validatorjs_1.default.useLang("id");
        const validator = new validatorjs_1.default(data, rules);
        if (validator.fails()) {
            let errorMessages = {};
            Object.entries(validator.errors.all()).forEach(([key, errorMessage]) => {
                errorMessages[key] = errorMessage[0];
            });
            return reject({
                code: "validation-fails",
                errorMessages: errorMessages,
            });
        }
        return resolve(data);
    });
};

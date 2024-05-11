"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertIntoAge = exports.convertEmptyStringsOrNullToStripe = exports.convertEmptyStringsToNull = void 0;
function convertEmptyStringsToNull(obj) {
    for (const key in obj) {
        if (typeof obj[key] === "string" && obj[key].trim() === "") {
            obj[key] = null;
        }
    }
    return obj;
}
exports.convertEmptyStringsToNull = convertEmptyStringsToNull;
function convertEmptyStringsOrNullToStripe(obj) {
    for (const key in obj) {
        if ((typeof obj[key] === "string" && obj[key].trim() === "") ||
            typeof obj[key] === null) {
            obj[key] = "-";
        }
    }
    return obj;
}
exports.convertEmptyStringsOrNullToStripe = convertEmptyStringsOrNullToStripe;
function convertIntoAge(birth) {
    const birthdate = new Date(birth);
    const currentDate = new Date();
    const ageInMilliseconds = currentDate.getTime() - birthdate.getTime();
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    return ageInYears;
}
exports.convertIntoAge = convertIntoAge;
// exports = {
//   convertEmptyStringsOrNullToStripe,
//   convertEmptyStringsToNull,
// };

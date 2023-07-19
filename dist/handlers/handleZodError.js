"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../env");
const handle = (err) => {
    const path = String(err.errors[0].path[0]);
    const message = err.errors[0].message;
    const error = { status: "error", path, message };
    if (env_1.NODE_ENV === "development") {
        error["stack"] = err.stack;
    }
    return error;
};
exports.default = handle;

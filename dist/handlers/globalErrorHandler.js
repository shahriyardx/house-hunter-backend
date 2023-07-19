"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("./handleZodError"));
const globalErrorHandler = (err, _req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json((0, handleZodError_1.default)(err));
    }
    return res.status(500).send("Something went wrong");
};
exports.globalErrorHandler = globalErrorHandler;

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
exports.requireRenter = exports.requireOwner = void 0;
const User_1 = require("../models/User");
const utils_1 = require("../utils");
const requireOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.headers.authorization;
    const decoded = (0, utils_1.decodeAccessToken)(auth);
    if (decoded) {
        if (decoded.role === "owner") {
            const user = yield User_1.User.findOne({ email: decoded.email, role: "owner" });
            if (!user) {
                return res.json({ status: "error", message: "you are not authorized" });
            }
            return next();
        }
        return res.json({ status: "error", message: "you are not authorized" });
    }
    return res.json({ status: "error", message: "you are not authorized" });
});
exports.requireOwner = requireOwner;
const requireRenter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.headers.authorization;
    const decoded = (0, utils_1.decodeAccessToken)(auth);
    if (decoded) {
        if (decoded.role === "customer") {
            const user = yield User_1.User.findOne({
                email: decoded.email,
                role: "customer",
            });
            if (!user) {
                return res.json({ status: "error", message: "you are not authorized" });
            }
            return next();
        }
        return res.json({ status: "error", message: "you are not authorized" });
    }
    return res.json({ status: "error", message: "you are not authorized" });
});
exports.requireRenter = requireRenter;

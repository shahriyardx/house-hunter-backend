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
const express_1 = require("express");
const user_1 = require("../schema/user");
const utils_1 = require("../utils");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    let loginData;
    try {
        loginData = yield user_1.loginSchema.parseAsync(data);
    }
    catch (err) {
        return next(err);
    }
    const userExists = yield User_1.User.findOne({ email: loginData.email });
    if (!userExists) {
        return res.status(409).json({
            status: "error",
            message: "invalid email or password",
        });
    }
    const passwordValid = (0, utils_1.compareHash)(loginData.password, userExists.password_hash);
    if (!passwordValid) {
        return res
            .status(403)
            .json({ status: "error", message: "invalid email or password" });
    }
    return res.json({
        status: "success",
        message: "login succesfull",
        role: userExists.role,
        accessToken: (0, utils_1.generateAccessToken)({
            name: userExists.name,
            email: userExists.email,
            role: userExists.role,
        }),
    });
}));
router.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    let registerData;
    try {
        registerData = yield user_1.registerSchema.parseAsync(data);
    }
    catch (err) {
        return next(err);
    }
    const userExists = yield User_1.User.findOne({ email: registerData.email });
    if (userExists) {
        return res.status(409).json({
            status: "error",
            message: "another account with this email exists",
        });
    }
    const { name, email, role, password } = registerData;
    const password_hash = (0, utils_1.genPasswordHash)(password);
    const userData = { name, email, role, password_hash };
    yield User_1.User.create(userData);
    res.json({
        status: "success",
        message: "registration succesful",
    });
}));
exports.default = router;

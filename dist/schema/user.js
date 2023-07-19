"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerSchema = zod_1.default
    .object({
    name: zod_1.default
        .string({
        invalid_type_error: "name must be string",
        required_error: "name is required",
    })
        .min(3, { message: "name is too short" }),
    email: zod_1.default
        .string({ required_error: "email is required" })
        .email({ message: "must be a valid email" }),
    role: zod_1.default.enum(["customer", "owner"]),
    password: zod_1.default
        .string({ required_error: "password is required" })
        .min(8, { message: "password must be atleast 8 character long" }),
    confirmPassword: zod_1.default
        .string({ required_error: "confirm password is required" })
        .min(8, { message: "password must be atleast 8 character long" }),
})
    .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwords do not match",
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default
        .string({ required_error: "email is required" })
        .email({ message: "must be a valid email" }),
    password: zod_1.default
        .string({ required_error: "password is required" })
        .min(1, { message: "password is required" }),
});

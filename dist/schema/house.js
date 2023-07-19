"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.houseCreateSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.houseCreateSchema = zod_1.default.object({
    name: zod_1.default.string({
        invalid_type_error: "name must be string",
        required_error: "name is required",
    }),
    address: zod_1.default.string({ required_error: "address is required" }),
    city: zod_1.default.string({ required_error: "city is required" }),
    room_size: zod_1.default.string({ required_error: "room size is required" }),
    description: zod_1.default.string({ required_error: "description is required " }),
    bedrooms: zod_1.default
        .number({ required_error: "bedrooms is required" })
        .min(1, { message: "minimum 1 room is required" }),
    bathrooms: zod_1.default
        .number({ required_error: "bathrooms is required" })
        .min(1, { message: "minimum 1 bnathroom is required" }),
    availability_date: zod_1.default.string({ required_error: "date is required" }),
    rent: zod_1.default.number().min(100, { message: "minimum rent is 100" }),
    contact_number: zod_1.default.string({ required_error: "contact number is required" }),
    image_url: zod_1.default.string({ required_error: "image is required" }),
});

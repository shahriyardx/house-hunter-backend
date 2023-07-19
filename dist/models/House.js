"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.House = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const HouseSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    room_size: {
        type: String,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    availability_date: {
        type: Date,
        required: true,
    },
    rent: {
        type: Number,
        required: true,
    },
    contact_number: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
});
exports.House = mongoose_1.default.model("House", HouseSchema);

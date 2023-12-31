"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BookingSchema = new mongoose_1.default.Schema({
    house: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "House",
    },
    renter: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
});
exports.Booking = mongoose_1.default.model("Booking", BookingSchema);

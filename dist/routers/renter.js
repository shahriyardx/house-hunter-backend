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
const Bookings_1 = require("../models/Bookings");
const utils_1 = require("../utils");
const renterRouter = (0, express_1.Router)();
renterRouter.get("/book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, utils_1.getUser)(req.headers.authorization);
    if (!user) {
        return res
            .status(403)
            .json({ status: "error", message: "you are not authorized" });
    }
    const bookings = yield Bookings_1.Booking.find({ renter: user._id }).populate(["house"]);
    res.json({ status: "success", data: bookings });
}));
renterRouter.delete("/book/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, utils_1.getUser)(req.headers.authorization);
    if (!user) {
        return res
            .status(403)
            .json({ status: "error", message: "you are not authorized" });
    }
    yield Bookings_1.Booking.findByIdAndDelete(req.params.bookId);
    res.json({ status: "success", message: "booking deleted" });
}));
renterRouter.post("/book/:houseId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, utils_1.getUser)(req.headers.authorization);
    if (!user) {
        return res
            .status(403)
            .json({ status: "error", message: "you are not authorized" });
    }
    const bookings = yield Bookings_1.Booking.find({ renter: user._id }).populate(["house"]);
    if (bookings.length >= 2) {
        return res
            .status(409)
            .json({ status: "error", message: "maximum bookings reached" });
    }
    yield Bookings_1.Booking.create({
        house: req.params.houseId,
        renter: user._id,
    });
    res.json({ status: "success", message: "booking completed" });
}));
exports.default = renterRouter;

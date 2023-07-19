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
const house_1 = require("../schema/house");
const House_1 = require("../models/House");
const utils_1 = require("../utils");
const Bookings_1 = require("../models/Bookings");
const ownerRouter = (0, express_1.Router)();
ownerRouter.get("/bookings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, utils_1.getUser)(req.headers.authorization);
    const houses = yield House_1.House.find({
        owner: user === null || user === void 0 ? void 0 : user._id,
    });
    const bookings = yield Bookings_1.Booking.find({
        house: { $in: houses.map((house) => house._id) },
    }).populate(["renter"]);
    res.json({ status: "success", data: bookings });
}));
ownerRouter.delete("/bookings/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Bookings_1.Booking.findByIdAndDelete(req.params.bookId);
    res.json({ status: "success", message: "booking deleted" });
}));
ownerRouter.get("/house/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, utils_1.getUser)(req.headers.authorization);
    const houses = yield House_1.House.find({
        owner: user === null || user === void 0 ? void 0 : user._id,
    });
    res.json(houses);
}));
ownerRouter.get("/house/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const house = yield House_1.House.findById(req.params.id);
    res.json({ status: house ? "success" : "error", message: "", data: house });
}));
ownerRouter.delete("/house/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const house = yield House_1.House.findById(req.params.id);
    if (!house) {
        return res.json({
            status: "error",
            message: "house not found",
            data: null,
        });
    }
    yield House_1.House.findByIdAndDelete(req.params.id);
    res.json({ status: "success", message: "house deletes", data: house });
}));
ownerRouter.patch("/house/edit/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    let houseData;
    try {
        houseData = yield house_1.houseCreateSchema.parseAsync(data);
    }
    catch (err) {
        return next(err);
    }
    yield House_1.House.findByIdAndUpdate(req.params.id, houseData);
    res.json({ status: "success", message: "House updated" });
}));
ownerRouter.post("/house/add", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    let houseData;
    try {
        houseData = yield house_1.houseCreateSchema.parseAsync(data);
    }
    catch (err) {
        return next(err);
    }
    const user = yield (0, utils_1.getUser)(req.headers.authorization);
    if (!user) {
        return res
            .status(403)
            .json({ status: "error", message: "you are not authorized" });
    }
    const da = yield House_1.House.create(Object.assign(Object.assign({}, houseData), { owner: user === null || user === void 0 ? void 0 : user.id }));
    res.json({ status: "success", message: "House added", data: da });
}));
exports.default = ownerRouter;

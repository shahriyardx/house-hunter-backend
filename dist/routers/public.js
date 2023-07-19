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
const House_1 = require("../models/House");
const publicRouter = (0, express_1.Router)();
publicRouter.get("/houses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const search = query.query || "";
    const page = Number(query.page) || 1;
    const totalHouses = yield House_1.House.countDocuments({ name: { $regex: search } });
    const houses = yield House_1.House.find({
        name: { $regex: search },
    })
        .skip((page - 1) * 10)
        .limit(10);
    res.json({ status: "success", message: "", data: { houses, totalHouses } });
}));
exports.default = publicRouter;

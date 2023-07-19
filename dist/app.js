"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routers/auth"));
const globalErrorHandler_1 = require("./handlers/globalErrorHandler");
const owner_1 = __importDefault(require("./routers/owner"));
const jwt_1 = require("./middlewares/jwt");
const public_1 = __importDefault(require("./routers/public"));
const renter_1 = __importDefault(require("./routers/renter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// routers
app.use("/", public_1.default);
app.use("/auth", auth_1.default);
app.use("/owner", jwt_1.requireOwner, owner_1.default);
app.use("/renter", jwt_1.requireRenter, renter_1.default);
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;

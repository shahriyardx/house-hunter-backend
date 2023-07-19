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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.decodeAccessToken = exports.generateAccessToken = exports.compareHash = exports.genPasswordHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("./env");
const User_1 = require("./models/User");
const genPasswordHash = (password) => {
    const salt = bcrypt_1.default.genSaltSync(10);
    const hash = bcrypt_1.default.hashSync(password, salt);
    return hash;
};
exports.genPasswordHash = genPasswordHash;
const compareHash = (password, hash) => {
    return bcrypt_1.default.compareSync(password, hash);
};
exports.compareHash = compareHash;
const generateAccessToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, env_1.JWT_SECRET);
    return token;
};
exports.generateAccessToken = generateAccessToken;
const decodeAccessToken = (auth) => {
    let token;
    try {
        token = auth.split("Bearer")[1].trim();
    }
    catch (_a) {
        return null;
    }
    const decode = jsonwebtoken_1.default.decode(token);
    return decode;
};
exports.decodeAccessToken = decodeAccessToken;
const getUser = (auth) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, exports.decodeAccessToken)(auth);
    const user = yield User_1.User.findOne({ email: decoded === null || decoded === void 0 ? void 0 : decoded.email });
    return user;
});
exports.getUser = getUser;

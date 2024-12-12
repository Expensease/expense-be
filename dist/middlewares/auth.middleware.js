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
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const db_1 = require("../db");
const mongodb_1 = require("mongodb");
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = req.cookies;
        console.log('inside middleware', req.cookies);
        if (!token) {
            res.status(403).json({
                message: 'No Auth Token'
            });
            return;
        }
        const payload = jsonwebtoken_1.default.verify(token, config_1.CONFIG.JWT_KEY);
        if (!payload) {
            res.status(403).json({
                message: 'Invalid or Expired Token'
            });
            return;
        }
        // check if user is valid user
        const { db } = yield (0, db_1.connect)();
        const user = yield db.collection('users').findOne({ _id: new mongodb_1.ObjectId(payload.id) });
        if (!user) {
            res.status(403).json({
                message: 'Invalid User'
            });
            return;
        }
        // console.log(payload, user, 'user')
        res.locals.user = payload;
        next();
    });
}

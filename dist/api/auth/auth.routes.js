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
const node_crypto_1 = require("node:crypto");
const db_1 = require("../../db");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../config");
const authRouter = (0, express_1.Router)();
const secret = process.env.HASH_PASS || '';
authRouter.post('/sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    const { db } = yield (0, db_1.connect)();
    let user = yield db.collection('users').findOne({ email });
    if (user) {
        res.status(400).json({ error: 'Email not available' });
        return;
    }
    const hashPassword = (0, node_crypto_1.createHmac)('sha256', secret).update(password).digest('hex');
    const newUser = yield db.collection('users').insertOne({ email, password: hashPassword, name, createdAt: new Date() });
    const token = (0, jsonwebtoken_1.sign)({ id: newUser.insertedId, email }, config_1.CONFIG.JWT_KEY);
    // Store the token in a cookie
    res.cookie('Auth-Token', token, { httpOnly: true, secure: false }); // Set secure: true for HTTPS in production
    // @ts-ignore
    // req.session.userId = newUser.insertedId
    // // @ts-ignore
    // req.session.token = token
    res.json(Object.assign(Object.assign({}, newUser), { token }));
    return;
}));
authRouter.post('/sign-in', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { db } = yield (0, db_1.connect)();
    const hashPassword = (0, node_crypto_1.createHmac)('sha256', secret).update(password).digest('hex');
    let user = yield db.collection('users').findOne({ email });
    if (!user) {
        res.status(400).json({ error: 'Email/Password is incorrect' });
        return;
    }
    if (user.password !== hashPassword) {
        res.status(400).json({ error: 'Email/Password is incorrect' });
        return;
    }
    delete user.password;
    const token = (0, jsonwebtoken_1.sign)({ id: user._id, email }, config_1.CONFIG.JWT_KEY);
    // TODO: need to check why this cookie is not getting set in ui
    // Store the token in a cookie
    res.cookie('Auth-Token', token, { httpOnly: true, secure: false }); // Set secure: true for HTTPS in production
    // @ts-ignore
    // req.session.userId = user._id
    // // @ts-ignore
    // req.session.token = token
    res.json(Object.assign(Object.assign({}, user), { token }));
    return;
}));
authRouter.get('/log-out', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.session.destroy((error) => {
            if (error) {
                return res.status(500).json({ message: 'Logout failed' });
            }
            res.clearCookie('my-test-session');
            res.json({ message: 'Logout successful' });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
        return;
    }
}));
exports.default = authRouter;

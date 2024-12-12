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
exports.paymentRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const db_1 = require("../../db");
const mongodb_1 = require("mongodb");
exports.paymentRouter = (0, express_1.Router)();
exports.paymentRouter.get('/:groupId', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { id: userId } = res.locals.user
    const { groupId } = req.params;
    const { db } = yield (0, db_1.connect)();
    const payments = yield db.collection('payments')
        .aggregate([
        {
            $match: {
                // members: new ObjectId(userId),
                groupId: new mongodb_1.ObjectId(groupId)
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'members',
                foreignField: '_id',
                as: 'members'
            }
        },
        {
            $sort: {
                _id: -1
            }
        }
    ]).toArray();
    // .find({ members: userId }).toArray()
    res.send({ payments });
    return;
}));
exports.paymentRouter.post('/', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const { id: userId } = res.locals.user;
    const { amount, members, groupId, title, message } = req.body;
    const { db } = yield (0, db_1.connect)();
    const newPayment = yield db.collection('payments').insertOne({
        amount,
        members: [...members.map(m => new mongodb_1.ObjectId(m))],
        groupId: new mongodb_1.ObjectId(groupId),
        title,
        message,
        createdAt: new Date(),
        createdBy: userId
    });
    res.send({ newPayment });
    return;
}));

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
const express_1 = require("express");
const db_1 = require("../../db");
const groups_controller_1 = __importDefault(require("./groups.controller"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const mongodb_1 = require("mongodb");
const groupsRouter = (0, express_1.Router)();
const gc = new groups_controller_1.default();
groupsRouter.get("/", auth_middleware_1.authMiddleware, gc.getAllGroups);
groupsRouter.post("/new", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const groupId = req.params.id; // Getting the `id` parameter from the URL
    const { db } = yield (0, db_1.connect)();
    const { id: userId } = res.locals.user;
    const { name = "", members = [] } = req.body;
    const total = yield db.collection("groups").countDocuments({ name });
    if (total !== 0) {
        res.status(400).send({ error: 'Group name not available.' });
        return;
    }
    const newGroup = yield db.collection("groups").insertOne({
        members: [...members.map(id => new mongodb_1.ObjectId(id))],
        createdBy: new mongodb_1.ObjectId(userId),
        name,
    });
    res.send(newGroup);
    return;
}));
exports.default = groupsRouter;

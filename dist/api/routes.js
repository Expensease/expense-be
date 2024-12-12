"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const groups_routes_1 = __importDefault(require("./groups/groups.routes"));
const express_1 = require("express");
const payments_routes_1 = require("./payments/payments.routes");
const users_routes_1 = __importDefault(require("./users/users.routes"));
const appRouter = (0, express_1.Router)();
appRouter.use('/auth', auth_routes_1.default);
appRouter.use('/groups', groups_routes_1.default);
appRouter.use('/payments', payments_routes_1.paymentRouter);
appRouter.use('/users', users_routes_1.default);
exports.default = appRouter;

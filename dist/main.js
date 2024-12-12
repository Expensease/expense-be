"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./api/routes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = require("./db");
const envPath = {
    development: '.env.development',
    production: '.env.production'
};
const env = process.env.NODE_ENV || 'development';
dotenv_1.default.config({
    path: envPath[env]
});
const app = (0, express_1.default)();
(0, db_1.connect)();
app.use((0, cors_1.default)({
    origin: 'https://expense-app-web.vercel.app',
    credentials: true // Allow cookies to be sent with the reques
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// app.use(
//   session({
//     name: 'my-expense-session',
//     secret: 's1',
//     // maxAge: 24 * 60 * 60 * 1000, // 24 hours
//     cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // for development, set 'secure: false' unless using https
//     resave: false,
//     saveUninitialized: true
//   })
// )
app.use('/api', routes_1.default);
app.use('*', (req, res) => {
    res.json('Welcome to the Expense Ease Backend API');
});
app.listen(4000, () => console.log('Running at port 4000...'));

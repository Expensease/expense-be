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
exports.User = void 0;
const crypto_1 = require("crypto");
const index_1 = require("./index");
const secret = process.env.HASH_PASS || '';
class User extends index_1.MongoBase {
    constructor(newUser) {
        super();
    }
    createNewUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name } = userData;
            const hashPassword = (0, crypto_1.createHmac)('sha256', secret).update(password).digest('hex');
            const newUser = yield this.db
                .collection('users')
                .insertOne({ email, password: hashPassword, name: '', createdAt: new Date() });
            return newUser;
        });
    }
}
exports.User = User;
exports.default = User;

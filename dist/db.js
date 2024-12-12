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
exports.connect = connect;
const mongodb_1 = require("mongodb");
globalThis.mongoClient = null;
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/test';
        console.log('dbURL', dbURL);
        if (globalThis.mongoClient) {
            console.log('using staled connection');
            return { client: globalThis.mongoClient, db: globalThis.mongoClient.db() };
        }
        const client = new mongodb_1.MongoClient(dbURL, { maxPoolSize: 10, serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds
        });
        client.on('timeout', () => {
        });
        const mongoClient = yield client.connect();
        globalThis.mongoClient = mongoClient;
        console.log('connected to db...');
        const db = mongoClient.db();
        return { client: mongoClient, db };
    });
}

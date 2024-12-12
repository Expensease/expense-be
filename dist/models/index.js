"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoBase = void 0;
const db_1 = require("../db");
class MongoBase {
    constructor() {
        (0, db_1.connect)().then(({ db, client }) => {
            this.db = db;
            this.client = client;
        });
    }
}
exports.MongoBase = MongoBase;
exports.default = MongoBase;

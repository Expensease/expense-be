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
const db_1 = require("../../db");
class GroupController {
    constructor() {
        this.getAllGroups = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { user } = res.locals;
            // const groupId = req.params.id; // Getting the `id` parameter from the URL
            const { db } = yield (0, db_1.connect)();
            const groups = yield db
                .collection("groups").aggregate([
                // {
                //   $match: {
                //     // createdBy: new ObjectId(res.locals.user.id),
                //     members: {
                //       $in: [new ObjectId(user.id)]
                //     }
                //   }
                // },
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
                },
                {
                    $limit: 10
                }
            ]).toArray();
            // .find({
            //   createdBy: new ObjectId(res.locals.user.id),
            // })
            // .limit(10)
            // .toArray();
            res.send(groups);
        });
    }
}
exports.default = GroupController;

import { Request, Response } from "express";
import { connect } from "../../db";
import { ObjectId } from "mongodb";
import { log } from "node:console";

export default class GroupController {

  getAllGroups = async (req: Request, res: Response) => {
    const { user } = res.locals
    // const groupId = req.params.id; // Getting the `id` parameter from the URL
    const { db } = await connect();
    const groups = await db
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
      ]).toArray()


    // .find({
    //   createdBy: new ObjectId(res.locals.user.id),
    // })
    // .limit(10)
    // .toArray();
    res.send(groups);
  };
}

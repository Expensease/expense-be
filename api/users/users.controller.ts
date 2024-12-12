import { Request, Response } from "express";
import { connect } from "../../db";

export default class GroupController {
  
  getAllGroups = async (req: Request, res: Response) => {
    // const groupId = req.params.id; // Getting the `id` parameter from the URL
    const { db } = await connect();
    const groups = await db
      .collection("groups")
      .find({
        members: {
          $in: [1],
        },
      })
      .limit(10)
      .toArray();
    res.send(groups);
  };
}

import { Router } from "express";
import { connect } from "../../db";
import GroupController from "./groups.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { ObjectId } from "mongodb";

const groupsRouter = Router();

const gc = new GroupController();

groupsRouter.get("/", authMiddleware, gc.getAllGroups);

groupsRouter.post("/new", authMiddleware, async (req, res) => {
  // const groupId = req.params.id; // Getting the `id` parameter from the URL
  const { db } = await connect();
  const { id: userId } = res.locals.user
  const { name = "", members = [] } = req.body as any;
  const total = await db.collection("groups").countDocuments({ name })
  if (total !== 0) {
    res.status(400).send({ error: 'Group name not available.' });
    return
  }
  const newGroup = await db.collection("groups").insertOne({
    members: [...members.map(id => new ObjectId(id))],
    createdBy: new ObjectId(userId),
    name,
  });

  res.send(newGroup);
  return
});

export default groupsRouter;

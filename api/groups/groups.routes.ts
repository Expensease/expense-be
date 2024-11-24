import { Router } from "express";
import { connect } from "../../db";
import GroupController from "./groups.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const groupsRouter = Router();

const gc = new GroupController();

groupsRouter.get("/:id", authMiddleware, gc.getAllGroups);

groupsRouter.post("/new", async (req, res) => {
  // const groupId = req.params.id; // Getting the `id` parameter from the URL
  const { db } = await connect();
  const { name = "", userId = "", members = [] } = req.body as any;
  const newGroup = await db.collection("groups").insertOne({
    members,
    createdBy: userId,
    name,
  });
  res.send(newGroup);
  return
});

export default groupsRouter;

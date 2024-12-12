import { Router } from "express";
import { connect } from "../../db";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { ObjectId } from "mongodb";

const usersRouter = Router();

usersRouter.get("/", authMiddleware, async (req, res) => {
  // const groupId = req.params.id; // Getting the `id` parameter from the URL
  const { db } = await connect();
  const { id } = res.locals.user

  const users = await db.collection("users").find({
    // _id: {
    //   $nin: [new ObjectId(id as string)]
    // }
  }).limit(10).toArray();

  res.send(users.map(({ password, ...i }) => i));
  return
});

export default usersRouter;

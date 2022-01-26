import { Router } from "express";
import { findPostById } from "../../services/post";
import asyncHandler from "../../utils/async-handler";

export default (app: Router) => {
  const route = Router();

  route.get(
    "/:postId",
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const post = await findPostById(postId);
      res.status(200).json({
        isOk: true,
        post,
      });
    })
  );

  app.use("/posts", route);
};

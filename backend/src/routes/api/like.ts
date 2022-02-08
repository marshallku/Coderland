import { Router } from "express";
import { asyncHandler } from "../../utils";
import { Post } from "../../models";
import { loginRequired } from "../../passport/guards";
import PostService from "../../services/post";

const likeRouter = Router({ mergeParams: true });

likeRouter.post(
  "/",
  loginRequired,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const { postId } = req.params;
    const postService = new PostService(Post);
    await postService.updateLike(postId, user.id);
    res.status(200).json({ isOk: true });
  })
);

export default likeRouter;

import { Router } from "express";
import {
  findAllGathers,
  createGather,
  findGatherById,
  updateGather,
  deleteGather,
} from "../../services/gather";
import { Gather, Comment } from "../../models";
import CommentService from "../../services/comment";
import { asyncHandler } from "../../utils";
import {
  checkGatherPermission,
  loginRequired,
  checkCommentPermission,
} from "../middlewares";

export default (app: Router) => {
  const route = Router();

  // 모집 글 목록 조회
  route.get(
    "/",
    asyncHandler(async (req, res) => {
      const category = String(req.query.category);
      const currentPage = Number(req.query.currentPage) || 1;
      const [gathers, pagination] = await findAllGathers(category, currentPage);
      res.status(200).json({ isOk: true, gathers, pagination });
    })
  );

  // 모집 글 상세 조회
  route.get(
    "/:gatherId",
    asyncHandler(async (req, res) => {
      const { gatherId } = req.params;
      const gather = await findGatherById(gatherId);
      res.status(200).json({ isOk: true, gather });
    })
  );

  // 모집 글 등록
  route.post(
    "/",
    loginRequired,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const { title, contents, subject, category, area, tags } = req.body;
      const gatherId = await createGather(user, {
        title,
        contents,
        subject,
        category,
        area,
        tags,
      });
      res.status(201).json({ isOk: true, gatherId });
    })
  );

  // 모집 글 수정
  route.put(
    "/:gatherId",
    loginRequired,
    checkGatherPermission,
    asyncHandler(async (req, res) => {
      const { gatherId } = req.params;
      const { title, contents, subject, category, area, tags } = req.body;
      await updateGather(gatherId, {
        title,
        contents,
        subject,
        category,
        area,
        tags,
      });
      res.status(200).json({ isOk: true, gatherId });
    })
  );

  // 모집 글 삭제
  route.delete(
    "/:gatherId",
    loginRequired,
    checkGatherPermission,
    asyncHandler(async (req, res) => {
      const { gatherId } = req.params;
      await deleteGather(gatherId);
      res.status(200).json({ isOk: true, gatherId });
    })
  );

  // 댓글 작성
  route.post(
    "/:gatherId/comments",
    loginRequired,
    asyncHandler(async (req, res) => {
      const { user } = req;
      const { gatherId } = req.params;
      const { contents } = req.body;
      const commentService = new CommentService(Gather, Comment, gatherId);
      const commentId = await commentService.createComment(user, contents);
      res.status(201).json({ isOk: true, commentId });
    })
  );

  // 댓글 목록
  route.get(
    "/:gatherId/comments",
    asyncHandler(async (req, res) => {
      const { gatherId } = req.params;
      const currentPage = Number(req.query.currentPage) || 1;
      const commentService = new CommentService(Gather, Comment, gatherId);
      const [comments, pagination] = await commentService.findAllComments(
        currentPage
      );
      res.status(200).json({ isOk: true, comments, pagination });
    })
  );

  // 댓글 수정
  route.put(
    "/:gatherId/comments",
    loginRequired,
    checkCommentPermission,
    asyncHandler(async (req, res) => {
      const { contents, commentId } = req.body;
      const commentService = new CommentService(Gather, Comment);
      await commentService.updateComment(commentId, contents);
      res.status(200).json({ isOk: true, commentId });
    })
  );

  // 댓글 삭제
  route.delete(
    "/:gatherId/comments",
    loginRequired,
    checkCommentPermission,
    asyncHandler(async (req, res) => {
      const { gatherId } = req.params;
      const { commentId } = req.body;
      const commentService = new CommentService(Gather, Comment, gatherId);
      await commentService.deleteComment(commentId);
      res.status(200).json({ isOk: true, commentId });
    })
  );

  app.use("/gathers", route);
};

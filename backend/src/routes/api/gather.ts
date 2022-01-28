import { Router } from "express";
import {
  createGather,
  findGatherById,
  updateGather,
  deleteGather,
} from "../../services/gather";
import asyncHandler from "../../utils/async-handler";
import checkGatherPermission from "../middlewares/check-gather-permission";
import loginRequired from "../middlewares/login-required";

export default (app: Router) => {
  const route = Router();

  route.get(
    "/:gatherId",
    asyncHandler(async (req, res) => {
      const { gatherId } = req.params;
      const gather = await findGatherById(gatherId);
      res.status(200).json({ isOk: true, gather });
    })
  );

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

  app.use("/gathers", route);
};

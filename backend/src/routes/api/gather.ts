import { Router } from "express";
import {
  findAllGathers,
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
    "/",
    asyncHandler(async (req, res) => {
      const category = String(req.query.category);
      const page = Number(req.query.page) || 1;
      const [gathers, pagination] = await findAllGathers(category, page);
      res.status(200).json({ isOk: true, gathers, pagination });
    })
  );

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

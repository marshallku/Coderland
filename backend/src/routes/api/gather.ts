import { Router } from "express";
import { createGather, findGatherById } from "../../services/gather";
import asyncHandler from "../../utils/async-handler";
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
      const {
        title,
        contents,
        subject,
        category,
        memberLimitCount,
        area,
        tags,
      } = req.body;
      const gatherId = await createGather(user, {
        title,
        contents,
        subject,
        category,
        memberLimitCount: Number(memberLimitCount),
        area,
        tags,
      });
      res.status(201).json({ isOk: true, gatherId });
    })
  );

  app.use("/gathers", route);
};

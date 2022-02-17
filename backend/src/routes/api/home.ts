import { Router } from "express";
import { readFileSync } from "fs";
import { resolve } from "path";

import { asyncHandler } from "../../utils";
import { loginCheck } from "../../passport/guards";

export default (app: Router) => {
  const route = Router();

  // Carousel 아이템 목록 조회
  route.get(
    "/carousel",
    loginCheck,
    asyncHandler(async (_, res) => {
      const carousel = JSON.parse(
        readFileSync(resolve(__dirname, "../../../carousel.json"), "utf-8")
      );
      res.status(200).json({
        isOk: true,
        carousel,
      });
    })
  );

  app.use("/home", route);
};

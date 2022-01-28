import { Request, Response, NextFunction } from "express";
import { Gather } from "../../models/Gather";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { gatherId } = req.params;
  const { user } = req;

  try {
    const gather = await Gather.findGatherById(gatherId);

    if (gather.author.id !== user.id) {
      return next(new Error("권한이 없어요..."));
    }
  } catch (error) {
    return next(new Error("존재하지 않는 글입니다."));
  }
  return next();
};

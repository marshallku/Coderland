import { IUserDocument } from "user";
import { IGatherDocument } from "gather";
import { Gather } from "../models/Gather";

export async function createGather(
  user: IUserDocument,
  gatherDto: Partial<IGatherDocument>
) {
  const gather = await Gather.createGather(user, gatherDto);
  return gather.id;
}

export async function findGatherById(gatherId: string) {
  try {
    const gather = await Gather.findGatherById(gatherId);
    const { author, ...rest } = gather.toObject();
    return {
      ...rest,
      author: author.nickname,
    };
  } catch (error) {
    throw new Error("존재하지 않는 글입니다.");
  }
}

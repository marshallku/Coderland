import { Model, PopulatedDoc } from "mongoose";
import { IUserDocument } from "user";
import { IPostDocument } from "post";

type categories = "study" | "code" | "team";

export interface IGather {
  area: string;
  isCompleted: boolean;
  memberCount: number;
  members: PopulatedDoc<IUserDocument>[];
  tags: string[];
}

export interface IGatherDocument
  extends Omit<IPostDocument, "anonymous">,
    IGather {
  subject: "gathering";
  category: categories;
}

export interface IGatherModel extends Model<IGatherDocument> {
  createGather: (
    user: IUserDocument,
    gatherDto: Partial<IGatherDocument>
  ) => Promise<IGatherDocument>;

  findGatherById: (gatherId: string) => Promise<IGatherDocument>;

  updateGather: (
    gatherId: string,
    gatherDto: Partial<IGatherDocument>
  ) => Promise<void>;

  deleteGather: (gatherId: string) => Promise<void>;
}

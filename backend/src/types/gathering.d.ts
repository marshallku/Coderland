import { Document, PopulatedDoc } from "mongoose";
import { IUserDocument } from "user";

export interface IGathering {
  area: string;
  isCompleted: boolean;
  memberCount: number;
  members: PopulatedDoc<IUserDocument>[];
}

export interface IGatheringDocument extends IGathering, Document {}

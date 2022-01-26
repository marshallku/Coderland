import mongoose from "mongoose";
import { IGatheringDocument } from "gathering";
import { UserSchema } from "./User";

export const GatheringSchema = new mongoose.Schema<IGatheringDocument>({
  area: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  memberCount: {
    type: Number,
    default: 0,
  },
  members: [UserSchema],
});

const Gathering = mongoose.model<IGatheringDocument>(
  "Gathering",
  GatheringSchema
);

export { Gathering };

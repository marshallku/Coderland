import mongoose from "mongoose";
import { IGatherDocument, IGatherModel } from "gather";
import { UserSchema } from "./User";

export const GatherSchema = new mongoose.Schema<IGatherDocument>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 50,
    },
    contents: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    subject: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
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
    memberLimitCount: {
      type: Number,
      required: true,
    },
    members: [UserSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

GatherSchema.statics.findGatherById = async (gatherId) => {
  const gather = await Gather.findById(gatherId).populate("author", "nickname");
  return gather;
};

GatherSchema.statics.createGather = async (user, gatherDto) => {
  const gather = await Gather.create({
    ...gatherDto,
    author: user,
  });
  return gather;
};

const Gather = mongoose.model<IGatherDocument, IGatherModel>(
  "Gather",
  GatherSchema
);

export { Gather };

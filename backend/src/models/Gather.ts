import mongoose from "mongoose";
import { IGatherDocument, IGatherModel } from "gather";
import { UserSchema } from "./User";
import configs from "../config";

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
      default: 1,
    },
    members: {
      type: [UserSchema],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

function isSelected(category: string) {
  return ["study", "code", "team"].includes(category);
}

GatherSchema.statics.findAllGathers = async (category, currentPage) => {
  const condition = isSelected(category) ? { category } : {};

  const total = await Gather.countDocuments(condition);
  const { perPage } = configs;
  const lastPage = Math.ceil(total / perPage);

  const gathers = await Gather.find(condition)
    .populate("author", "nickname")
    .sort("-createdAt")
    .skip((currentPage - 1) * perPage)
    .limit(perPage);

  return [gathers, { currentPage, lastPage }];
};

GatherSchema.statics.findGatherById = async (gatherId) => {
  const gather = await Gather.findById(gatherId).populate("author", "nickname");
  return gather;
};

GatherSchema.statics.createGather = async (user, gatherDto) => {
  const gather = await Gather.create({
    ...gatherDto,
    author: user,
    members: [user],
  });

  return gather;
};

GatherSchema.statics.updateGather = async (gatherId, gatherDto) => {
  await Gather.findByIdAndUpdate(gatherId, gatherDto);
};

GatherSchema.statics.deleteGather = async (gatherId) => {
  await Gather.findByIdAndDelete(gatherId);
};

const Gather = mongoose.model<IGatherDocument, IGatherModel>(
  "Gather",
  GatherSchema
);

export { Gather };

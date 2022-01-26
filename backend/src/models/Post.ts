import mongoose from "mongoose";
import { IPostDocument } from "post";
import { CommentSchema } from "./Comment";
import { GatheringSchema } from "./Gathering";

export const PostSchema = new mongoose.Schema<IPostDocument>(
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
    comments: [CommentSchema],
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
    },
    tags: {
      type: [String],
    },
    anonymity: {
      type: Boolean,
      default: false,
    },
    gathering: GatheringSchema,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Post = mongoose.model<IPostDocument>("Post", PostSchema);

export { Post };

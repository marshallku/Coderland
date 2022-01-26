import { Document, PopulatedDoc } from "mongoose";
import { ICommentDocument } from "comment";
import { IGatheringDocument } from "gathering";
import { IUserDocument } from "user";

export interface IPost {
  title: string;
  contents: string;
  author: PopulatedDoc<IUserDocument>;
  comments: ICommentDocument[];
  views: number;
  likes: number;
  subject: "review" | "gathering" | "article" | "dev" | "recruit" | "chat";
  category: ("study" | "code" | "team") | undefined;
  tags: string[];
  anonymity: boolean;
  gathering: IGatheringDocument;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostDocument extends IPost, Document {}

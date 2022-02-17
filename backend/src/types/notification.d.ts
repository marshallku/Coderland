import { Document, Model } from "mongoose";

interface INotification {
  userId: string;
  to: string;
  isNewNotification: boolean;
  title: string;
  createdAt: number;
  flag: string;
}

interface INotificationDocument extends INotification, Document {}

interface INotificationModel extends Model<INotificationDocument> {
  addNotification: (
    userId: string,
    to: string,
    title: string,
    flag: "comment" | "reply"
  ) => Promise<void>;

  findAllNotification: (userId: string) => Promise<INotificationDocument[]>;

  updateNotification: (userId: string) => Promise<void>;
}

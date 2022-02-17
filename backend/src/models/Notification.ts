import mongoose from "mongoose";
import { INotificationDocument, INotificationModel } from "notification";

const month = 1000 * 60 * 60 * 24 * 30;

export const NotificationSchema = new mongoose.Schema<INotificationDocument>(
  {
    userId: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    isNewNotification: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Number,
    },
  },
  {
    versionKey: false,
  }
);

/**
 * add Notification
 */
NotificationSchema.statics.addNotification = async (
  userId: string,
  to: string,
  title: string
) => {
  const createdAt = Date.now();
  await Notification.create({
    userId,
    to,
    title,
    createdAt,
  });
};

/**
 * find all notification
 */
NotificationSchema.statics.findAllNotification = async (userId: string) => {
  const notification = await Notification.find({ userId }).select(
    "-userId -createdAt"
  );
  return notification;
};

/**
 * 오래된 알림 지우기, 알림 읽음 처리하기
 */
NotificationSchema.statics.updateNotification = async (userId: string) => {
  // 알림 읽음 처리
  await Notification.updateMany(
    { userId },
    {
      isNewNotification: false,
    }
  );
  const currentDate = Date.now();
  // 오래된 알림 지우기
  await Notification.deleteMany({
    userId,
    createdAt: { $lte: currentDate - month },
  });
};

const Notification = mongoose.model<INotificationDocument, INotificationModel>(
  "Notification",
  NotificationSchema
);

export { Notification };

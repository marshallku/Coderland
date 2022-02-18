import instance from "./instance";

export default function getNotification(): Promise<
  INotificationResponse | IFailResponse
> {
  return instance.get("/users/notification");
}

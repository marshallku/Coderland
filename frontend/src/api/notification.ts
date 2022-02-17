import instance from "./instance";

export default function getNotification(
  token: string
): Promise<INotificationResponse | IFailResponse> {
  return instance.get("/users/notification", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

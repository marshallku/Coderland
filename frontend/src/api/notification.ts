import instance from "./instance";

export function getNotification(): Promise<
  INotificationResponse | IFailResponse
> {
  return instance.get("/users/notification");
}

export function addPushEndPoint(
  subscription: PushSubscription
): Promise<ISuccessResponse | IFailResponse> {
  localStorage.setItem("endpoint", subscription.endpoint);
  return instance.post("/users/push", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription.toJSON()),
  });
}

export function removePushPoint(
  endpoint: string
): Promise<ISuccessResponse | IFailResponse> {
  localStorage.removeItem("endpoint");
  return instance.delete("/users/push", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ endpoint }),
  });
}

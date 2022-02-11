import instance from "./instance";

export function getMyInfo(
  token: string
): Promise<Omit<IUser, "token"> | IFailResponse> {
  return instance.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateMyInfo(
  user: IUser
): Promise<Omit<IUser, "token"> | IFailResponse> {
  return instance.patch("/users", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(user),
  });
}

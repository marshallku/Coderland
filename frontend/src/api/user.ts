import instance from "./instance";

export function getMyInfo(): Promise<IUserResponse | IFailResponse> {
  return instance.get("/users");
}

export function updateMyInfo(
  userInfo: Pick<IUser, "nickname" | "track" | "github">
): Promise<IUserResponse | IFailResponse> {
  return instance.patch("/users", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
}

export function getUserAuthKey(): Promise<IAuthKeyResponse | IFailResponse> {
  return instance.get("/users/auth");
}

export function authorizeUser({
  username,
}: {
  username: string;
}): Promise<ISuccessResponse | IFailResponse> {
  return instance.post("/users/auth", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
}

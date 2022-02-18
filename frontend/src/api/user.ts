import instance from "./instance";

export function getMyInfo(
  token: string
): Promise<IUserResponse | IFailResponse> {
  return instance.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateMyInfo(
  userInfo: Pick<IUser, "nickname" | "track" | "github">,
  token: string
): Promise<IUserResponse | IFailResponse> {
  return instance.patch("/users", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userInfo),
  });
}

export function getUserAuthKey(
  token: string
): Promise<IAuthKeyResponse | IFailResponse> {
  return instance.get("/users/auth", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function authorizeUser({
  username,
  token,
}: {
  username: string;
  token: string;
}): Promise<ISuccessResponse | IFailResponse> {
  return instance.post("/users/auth", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  });
}

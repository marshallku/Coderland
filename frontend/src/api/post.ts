import { composeQuery } from "../utils/url";
import instance from "./instance";

export function getPostList({
  subject,
  page = 1,
  perPage,
}: {
  subject: string;
  perPage?: number;
  page?: number;
}): Promise<IPostListResponse | IFailResponse> {
  const query = composeQuery({
    subject,
    page,
    perPage,
  });

  return instance.get(`/posts${query}`);
}

export function getGatherPostList({
  category,
  page = 1,
  perPage,
}: {
  category?: TGatherCategory;
  perPage?: number;
  page?: number;
} = {}): Promise<IGatherPostListResponse | IFailResponse> {
  const query = composeQuery({
    subject: "gather",
    category,
    page,
    perPage,
  });

  return instance.get(`/posts${query}`);
}

export function getPost<T = IPostResponse | IGatherPostResponse>(
  id: string,
  token?: string
): Promise<T | IFailResponse> {
  return instance.get(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function createPost<T extends IPost | IGatherPost>(
  post: Partial<T>,
  token: string
): Promise<IPostModifyResponse | IFailResponse> {
  return instance.post("/posts", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
}

export function updatePost<T extends IPost | IGatherPost>({
  post,
  id,
  token,
}: {
  post: Partial<T>;
  id: string;
  token: string;
}): Promise<IPostModifyResponse | IFailResponse> {
  return instance.post(`/posts/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
}

export function deletePost({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<ISuccessResponse | IFailResponse> {
  return instance.delete(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function addClap({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<ISuccessResponse | IFailResponse> {
  return instance.post(`/posts/${id}/like`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function removeClap({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<ISuccessResponse | IFailResponse> {
  return instance.delete(`/posts/${id}/like`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function addBookmark({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<ISuccessResponse | IFailResponse> {
  return instance.post(`/posts/${id}/bookmark`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function removeBookmark({
  id,
  token,
}: {
  id: string;
  token: string;
}): Promise<ISuccessResponse | IFailResponse> {
  return instance.delete(`/posts/${id}/bookmark`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

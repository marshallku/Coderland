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

export function getPost<T extends IPostResponse | IGatherPostResponse>(
  id: string
): Promise<T | IFailResponse> {
  return instance.get(`/posts/${id}`);
}

export function getBookmarkedPost({
  page = 1,
}): Promise<IPostListResponse | IFailResponse> {
  const query = composeQuery({
    page,
  });
  return instance.get(`/users/bookmark${query}`);
}

export function createPost<T extends IPost | IGatherPost>(
  post: Partial<T>
): Promise<IPostModifyResponse | IFailResponse> {
  return instance.post("/posts", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
}

export function updatePost<T extends IPost | IGatherPost>({
  post,
  id,
}: {
  post: Partial<T>;
  id: string;
}): Promise<IPostModifyResponse | IFailResponse> {
  return instance.put(`/posts/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
}

export function deletePost({
  id,
}: {
  id: string;
}): Promise<ISuccessResponse | IFailResponse> {
  return instance.delete(`/posts/${id}`);
}

export function addClap({
  id,
}: {
  id: string;
}): Promise<ISuccessResponse | IFailResponse> {
  return instance.post(`/posts/${id}/like`);
}

export function removeClap({
  id,
}: {
  id: string;
}): Promise<ISuccessResponse | IFailResponse> {
  return instance.delete(`/posts/${id}/like`);
}

export function addBookmark({
  id,
}: {
  id: string;
}): Promise<ISuccessResponse | IFailResponse> {
  return instance.post(`/posts/${id}/bookmark`);
}

export function removeBookmark({
  id,
}: {
  id: string;
}): Promise<ISuccessResponse | IFailResponse> {
  return instance.delete(`/posts/${id}/bookmark`);
}

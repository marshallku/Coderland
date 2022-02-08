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
  return instance.get(
    `/posts?subject=${subject}&page=${page}${
      perPage ? `&perPage=${perPage}` : ""
    }`
  );
}

export function getGatherPostList({
  category,
  page = 1,
  perPage,
}: {
  category?: "study" | "code" | "team";
  perPage?: number;
  page?: number;
} = {}): Promise<IGatherPostListResponse | IFailResponse> {
  return instance.get(
    `/posts?subject=gathering${
      category ? `&category=${category}` : ""
    }&page=${page}${perPage ? `&perPage=${perPage}` : ""}`
  );
}

export function getPost(
  id: string
): Promise<IPostResponse | IGatherPostResponse | IFailResponse> {
  return instance.get(`/posts/${id}`);
}

export function createPost(
  post: {
    title: string;
    content: string;
    subject: TSubject;
  },
  token: string
) {
  return instance.post("/posts", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
}

export function createGatherPost(
  post: {
    title: string;
    content: string;
    category: TGatherCategory;
    area: string;
    tags: Array<string>;
  },
  token: string
): Promise<IGatherModifyResponse | IFailResponse> {
  return instance.post("/posts", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ subject: "gathering", ...post }),
  });
}

export function updatePost({
  post,
  id,
  token,
}: {
  post: IPost | IGatherPost;
  id: string;
  token: string;
}): Promise<ISuccessResponse | IFailResponse> {
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

export function addLike({
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

export function removeLike({
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

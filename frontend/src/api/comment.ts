import instance from "./instance";

export function getCommentList({
  postId,
}: {
  postId: string;
}): Promise<ICommentListResponse | IFailResponse> {
  return instance.get(`/posts/${postId}/comments`);
}

export function createComment({
  contents,
  postId,
  token,
}: {
  contents: string;
  postId: string;
  token: string;
}): Promise<ICommentModifyResponse | IFailResponse> {
  return instance.post(`/posts/${postId}/comments`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ contents }),
  });
}

export function updateComment({
  contents,
  commentId,
  postId,
  token,
}: {
  contents: string;
  commentId: string;
  postId: string;
  token: string;
}): Promise<ICommentModifyResponse | IFailResponse> {
  return instance.put(`/posts/${postId}/comments`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ commentId, contents }),
  });
}

export function deleteComment({
  commentId,
  postId,
  token,
}: {
  commentId: string;
  postId: string;
  token: string;
}): Promise<ICommentModifyResponse | IFailResponse> {
  return instance.delete(`/posts/${postId}/comments`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ commentId }),
  });
}

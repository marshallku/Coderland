import instance from "./instance";

export function getCommentList({
  postId,
}: {
  postId: string;
}): Promise<ICommentListResponse | IFailResponse> {
  return instance.get(`/posts/${postId}/comments`);
}

export function createComment({
  postId,
  contents,
  token,
}: {
  postId: string;
  contents: string;
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

export function createReply({
  postId,
  commentId,
  contents,
  token,
}: {
  postId: string;
  commentId: string;
  contents: string;
  token: string;
}): Promise<ICommentModifyResponse | IFailResponse> {
  return instance.post(`/posts/${postId}/replies`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ contents, commentId }),
  });
}

export function updateComment({
  postId,
  commentId,
  contents,
  token,
}: {
  postId: string;
  commentId: string;
  contents: string;
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

export function updateReply({
  postId,
  parentId: commentId,
  commentId: replyId,
  contents,
  token,
}: {
  parentId: string;
  postId: string;
  commentId: string;
  contents: string;
  token: string;
}): Promise<ICommentModifyResponse | IFailResponse> {
  return instance.put(`/posts/${postId}/replies`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ commentId, replyId, contents }),
  });
}

export function deleteComment({
  postId,
  commentId,
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

export function deleteReply({
  postId,
  parentId: commentId,
  commentId: replyId,
  token,
}: {
  parentId: string;
  postId: string;
  commentId: string;
  token: string;
}): Promise<ICommentModifyResponse | IFailResponse> {
  return instance.delete(`/posts/${postId}/replies`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ commentId, replyId }),
  });
}

export function addCommentClap({
  postId,
  commentId,
  token,
}: {
  postId: string;
  commentId: string;
  token: string;
}): Promise<ISuccessResponse | IFailResponse> {
  return instance.post(`/posts/${postId}/comments/like`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ commentId }),
  });
}

export function removeCommentClap({
  postId,
  commentId,
  token,
}: {
  postId: string;
  commentId: string;
  token: string;
}): Promise<ISuccessResponse | IFailResponse> {
  return instance.delete(`/posts/${postId}/comments/like`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ commentId }),
  });
}

export function createGatherRequest({
  postId,
  userId,
  token,
}: {
  postId: string;
  userId: string;
  token: string;
}): Promise<IGatherRequestResponse | IFailResponse> {
  return instance.post(`/posts/${postId}/cast`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });
}

export function deleteGatherRequest({
  postId,
  userId,
  token,
}: {
  postId: string;
  userId: string;
  token: string;
}): Promise<IGatherRequestResponse | IFailResponse> {
  return instance.delete(`/posts/${postId}/cast`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });
}

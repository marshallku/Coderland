interface IPostsProps {
  postList?: Array<Omit<IPost, "contents" | "subject">>;
  isLoading: Boolean;
}

interface IPostItemProps {
  postList?: Array<Omit<IPost, "contents" | "subject">>;
}

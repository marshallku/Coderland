interface IPostList {
  _id: string;
  title: string;
  view: number;
  likes: number;
  comments: number;
  author: string;
}

interface IPostsProps {
  postList?: Array<IPostList>;
  isLoading: Boolean;
}

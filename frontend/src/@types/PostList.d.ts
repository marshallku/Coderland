type TPostList = Array<Omit<IPost, "contents" | "subject">>;

type TPostCard = Array<IGatherPost>;

interface IPostsProps {
  postType: string;
  postList: TPostList | TPostCard;
}

interface IPostItemProps {
  postList: TPostList;
}
interface IPostCardItemProps {
  postList: TPostCard;
}

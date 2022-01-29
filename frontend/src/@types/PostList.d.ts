type TPostList = Array<Omit<IPost, "contents" | "subject">>;

type TPostCard = Array<IGatherPost>;

type TPostSubject = subject | "gathering";

interface IPostListProps {
  subject: TPostSubject;
}

interface IPostsProps {
  subject: TPostSubject;
  postList: TPostList | TPostCard;
}

interface IPostItemProps {
  postList: TPostList;
}
interface IPostCardItemProps {
  postList: TPostCard;
}

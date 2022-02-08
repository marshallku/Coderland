interface IPostListProps {
  subject: TSubject | "topView" | "latest";
}

interface IHomePostListProps {
  to?: string;
  title: string;
  response: IPostListResponse;
}

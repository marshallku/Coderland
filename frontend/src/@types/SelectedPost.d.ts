interface ISelectedPost {
  _id: string;
  title: string;
  author: string | "anonymity";
  createdAt: string;
  likes: number;
  // 더미데이터 삭제 후 Date로 변경 필요
  views: number;
  contents: string;
}

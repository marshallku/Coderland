interface ISelectedPost {
  _id: string;
  title: string;
  author: string | "anonymity";
  createdAt: string;
  //더미데이터 삭제 후 Date로 변경 필요
  likes: number;
  view: number;
  contents: string;
}

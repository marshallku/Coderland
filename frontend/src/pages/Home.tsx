import PostList from "../components/PostList";

export default function Home() {
  return (
    <div>
      <h1>홈!</h1>
      <PostList subject="chat" />
    </div>
  );
}

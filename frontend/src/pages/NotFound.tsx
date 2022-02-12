import DisplayError from "../components/DisplayError";

export default function NotFound() {
  return (
    <>
      <h1>404 Page Not Found</h1>
      <DisplayError message="페이지를 찾을 수 없어요" />
    </>
  );
}

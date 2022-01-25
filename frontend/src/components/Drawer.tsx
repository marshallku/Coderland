import { Link } from "react-router-dom";

export default function Drawer() {
  return (
    <nav>
      <h2>코더랜드</h2>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/recruit">팀원 모집</Link>
        </li>
      </ul>
    </nav>
  );
}

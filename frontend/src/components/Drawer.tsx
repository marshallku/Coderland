import { Link } from "react-router-dom";
import "./Drawer.css";

export default function Drawer() {
  return (
    <nav className="drawer">
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

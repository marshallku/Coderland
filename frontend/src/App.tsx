import { BrowserRouter, Route, Routes } from "react-router-dom";
import Drawer from "./components/Drawer";
import GlobalNavigationBar from "./components/GNB";
import Home from "./pages/Home";
import Recruit from "./pages/Recruit";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <GlobalNavigationBar />
        <Drawer />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recruit" element={<Recruit />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

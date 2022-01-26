import { BrowserRouter, Route, Routes } from "react-router-dom";
import Drawer from "./components/Drawer";
import GlobalNavigationBar from "./components/GNB";
import Home from "./pages/Home";
import Recruit from "./pages/Recruit";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalNavigationBar />
        <div className="main-container">
          <Drawer />
          <div className="container-wrap">
            <main className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recruit" element={<Recruit />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

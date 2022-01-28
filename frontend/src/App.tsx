import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalNavigation from "./components/GlobalNavigation";
import Home from "./pages/Home";
import Gather from "./pages/Gather";
import Detail from "./pages/Detail";
import Add from "./pages/Add";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalNavigation />
        <div className="main-container">
          <div className="container-wrap">
            <main className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gather" element={<Gather />} />
                <Route path="/posts/:id" element={<Detail />} />
                <Route path="/add/:subject" element={<Add />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

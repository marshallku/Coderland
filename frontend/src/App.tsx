import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalNavigation from "./components/GlobalNavigation";
import Home from "./pages/Home";
import Gather from "./pages/Gather";
import PostsDetail from "./pages/PostsDetail";
import GathersDetail from "./pages/GathersDetail";
import Add from "./pages/Add";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./data/Auth";
import RequireAuth from "./routes/RequireAuth";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalNavigation />
        <div className="main-container">
          <div className="container-wrap">
            <main className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gather" element={<Gather />} />
                <Route path="/gather/:category" element={<Gather />} />
                <Route path="/posts/:id" element={<PostsDetail />} />
                <Route path="/gathers/:id" element={<GathersDetail />} />
                <Route element={<RequireAuth />}>
                  <Route path="/add/:subject" element={<Add />} />
                </Route>
                <Route path="/search/*" element={<Search />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

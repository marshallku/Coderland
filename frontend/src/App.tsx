import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalNavigation from "./components/GlobalNavigation";
import { AuthProvider } from "./hooks/auth";
import { ThemeProvider } from "./hooks/theme";
import RequireAuth from "./routes/RequireAuth";
import ScrollController from "./components/ScrollController";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Gather from "./pages/Gather";
import Details from "./pages/Details";
import Write from "./pages/Write";
import NotFound from "./pages/NotFound";
import User, { UserInfo, UserBookmarks } from "./pages/User";
import Review from "./pages/Review";
import Article from "./pages/Article";
import Dev from "./pages/Dev";
import Recruit from "./pages/Recruit";
import Chat from "./pages/Chat";
import Authorize from "./pages/Authorize";
import Login from "./pages/Login";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollController />
          <GlobalNavigation />
          <ScrollToTop />
          <div className="container">
            <main className="main-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gather" element={<Gather />}>
                  <Route path=":category" element={<Gather />} />
                </Route>
                <Route path="/review" element={<Review />} />
                <Route path="/article" element={<Article />} />
                <Route path="/dev" element={<Dev />} />
                <Route path="/recruit" element={<Recruit />} />
                <Route path="/chat" element={<Chat />} />
                <Route element={<RequireAuth />}>
                  <Route path="/write/:subject" element={<Write />}>
                    <Route path=":category" element={<Write />} />
                  </Route>
                  <Route path="/user/*" element={<User />}>
                    <Route path="bookmarks" element={<UserBookmarks />} />
                    <Route path="*" element={<UserInfo />} />
                  </Route>
                  <Route path="/authorize" element={<Authorize />} />
                </Route>
                <Route path="/posts/:id" element={<Details />} />
                <Route path="/gathers/:id" element={<Details />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

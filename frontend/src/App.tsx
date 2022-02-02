import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalNavigation from "./components/GlobalNavigation";
import Home from "./pages/Home";
import Gather from "./pages/Gather";
import { PostDetails, GatherDetails } from "./pages/Details";
import Add from "./pages/Add";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./data/Auth";
import RequireAuth from "./routes/RequireAuth";
import User, {
  UserInfo,
  UserPosts,
  UserGatherPosts,
  UserComments,
  UserBookmarks,
} from "./pages/User";
import Review from "./pages/Review";
import Article from "./pages/Article";
import Dev from "./pages/Dev";
import Recruit from "./pages/Recruit";
import Chat from "./pages/Chat";

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
                <Route path="/gather" element={<Gather />}>
                  <Route path=":category" element={<Gather />} />
                </Route>
                <Route path="/review" element={<Review />} />
                <Route path="/article" element={<Article />} />
                <Route path="/dev" element={<Dev />} />
                <Route path="/recruit" element={<Recruit />} />
                <Route path="/chat" element={<Chat />} />
                <Route element={<RequireAuth />}>
                  <Route path="/add/:subject" element={<Add />} />
                  <Route path="/user/*" element={<User />}>
                    <Route path="posts" element={<UserPosts />} />
                    <Route path="gathers" element={<UserGatherPosts />} />
                    <Route path="comments" element={<UserComments />} />
                    <Route path="bookmarks" element={<UserBookmarks />} />
                    <Route path="*" element={<UserInfo />} />
                  </Route>
                </Route>
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/gathers/:id" element={<GatherDetails />} />
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

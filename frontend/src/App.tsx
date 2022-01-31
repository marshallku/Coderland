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
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/gathers/:id" element={<GatherDetails />} />
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

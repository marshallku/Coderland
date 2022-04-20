import create from "zustand";
import { getMyInfo } from "../api";
import { parseCookie } from "../utils/cookie";

const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem("token") || parseCookie()["access-token"],
  initialize: () => {
    const savedToken = localStorage.getItem("token");
    const cookieToken = parseCookie()["access-token"];

    if (!savedToken && !!cookieToken) {
      localStorage.setItem("token", cookieToken);
    }

    getMyInfo().then((response) => {
      if (!response.isOk) {
        return;
      }

      set((x) => ({ ...x, user: response.user }));
    });
  },
  setUser: (user: IUser) => {
    set((x) => ({ ...x, user }));
  },
  unsetUser: (cb?: () => void) => {
    set((x) => ({ ...x, user: undefined }));
    cb?.();
  },
}));

export default useAuthStore;

import { createContext, useContext, useState } from "react";
import { getMyInfo } from "../api/user";
import parseCookie from "../utils/cookie";

const authContext = createContext<IAuth | null>(null);

function useAuthProvider() {
  const savedToken = localStorage.getItem("token");
  const [user, setUser] = useState<IUser | null>(null);

  if (savedToken) {
    getMyInfo(savedToken).then((response) => {
      if (!response.isOk) {
        return;
      }

      setUser({ ...response.user, token: savedToken });
    });
  }

  return {
    signOut(cb?: () => unknown) {
      setUser(null);
      cb?.();
    },
    user,
  };
}

export function useAuth() {
  return useContext(authContext);
}

export function AuthProvider({ children }: { children: JSX.Element }) {
  const auth = useAuthProvider();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function saveUser(token: string) {
  if (!token) {
    return;
  }

  localStorage.setItem("token", token);
}

export function tryLoginOnLoad() {
  const savedToken = localStorage.getItem("token");

  if (savedToken || !document.cookie) {
    return;
  }

  const accessToken = parseCookie()["access-token"];

  saveUser(accessToken);
}

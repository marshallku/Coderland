import { createContext, useContext, useEffect, useState } from "react";
import { getMyInfo } from "../api/user";
import parseCookie from "../utils/cookie";

const authContext = createContext<IAuth | null>(null);

function useAuthProvider() {
  const { token } = window;
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    getMyInfo().then((response) => {
      if (!response.isOk) {
        return;
      }

      setUser({ ...response.user });
    });
  }, []);

  return {
    signOut(cb?: () => unknown) {
      setUser(null);
      cb?.();
    },
    update(newUser: IUser) {
      setUser(newUser);
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

function saveToken(token: string) {
  if (!token) {
    return;
  }

  localStorage.setItem("token", token);
}

export function tryLoginOnLoad() {
  const { token } = window;

  if (token || !document.cookie) {
    return;
  }

  const accessToken = parseCookie()["access-token"];

  saveToken(accessToken);
  window.token = accessToken;
}

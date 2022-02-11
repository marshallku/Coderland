import { createContext, useContext, useState } from "react";
import { getMyInfo } from "../api/user";
import parseQuery from "../utils/url";

const authContext = createContext<IAuth | null>(null);

function useAuthProvider() {
  // FIXME: 더미로 유저 추가해둠. 추후 null로 수정
  const savedToken = localStorage.getItem("token");
  const [user, setUser] = useState<IUser | null>(
    savedToken
      ? {
          googleId: "",
          nickname: "",
          name: "",
          profile: "",
          grade: 0,
          track: "",
          gitlab: "",
          authKey: "",
          token: savedToken,
        }
      : null
  );

  if (savedToken) {
    getMyInfo(savedToken).then((response) => {
      if ("isOk" in response) {
        return;
      }

      setUser({ ...response, token: savedToken });
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
  localStorage.setItem("token", token);
}

export function tryLoginOnLoad() {
  const { search } = window.location;
  if (!search.includes("code=")) {
    return;
  }

  const { code } = parseQuery(search);

  if (code) {
    saveUser(code);
  }
}

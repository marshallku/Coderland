import { createContext, useContext, useState } from "react";

const authContext = createContext<IAuth | null>(null);

function useAuthProvider() {
  // FIXME: 더미로 유저 추가해둠. 추후 null로 수정
  const [user, setUser] = useState<IUser | null>({
    googleId: "1230419308012123",
    nickname: "트럼프 병정",
    name: "홍길동",
    profile: "https://i.imgur.com/xCvzudW.png",
    grade: 0,
    track: "SW 엔지니어 트랙 1기",
    gitlab: "",
    authKey: "TEMPORARY_KEY",
  });

  return {
    signIn(cb?: () => unknown) {
      // TODO: 로그인 구현
      cb?.();
    },
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

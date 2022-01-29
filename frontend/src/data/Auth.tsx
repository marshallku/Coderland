import { createContext, useContext, useState } from "react";

const authContext = createContext<IAuth | null>(null);

function useAuthProvider() {
  const [user, setUser] = useState<IUser | null>(null);

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

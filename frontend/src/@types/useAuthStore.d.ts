interface AuthStore {
  token?: string;
  user?: IUser;
  initialize: () => void;
  setUser: (user: IUser) => void;
  unsetUser: (cb?: () => void) => void;
}

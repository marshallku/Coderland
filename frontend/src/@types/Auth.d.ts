interface IAuth {
  signIn(cb?: (() => unknown) | undefined): void;
  signOut(cb?: (() => unknown) | undefined): void;
  user: IUser | null;
}

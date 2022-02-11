interface IAuth {
  signOut(cb?: (() => unknown) | undefined): void;
  user: IUser | null;
}

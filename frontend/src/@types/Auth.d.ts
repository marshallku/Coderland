interface IAuth {
  signOut(cb?: (() => unknown) | undefined): void;
  update(newUser: IUser): void;
  user: IUser | null;
}

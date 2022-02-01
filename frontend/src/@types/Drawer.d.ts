interface IDrawerItem {
  title: string;
  to: string;
  icon: string;
  // eslint-disable-next-line no-unused-vars
  cb?: (...args: Array<unknown>) => unknown;
}

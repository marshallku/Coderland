interface DrawerItem {
  title: string;
  to: string;
  // eslint-disable-next-line no-unused-vars
  cb?: (...args: Array<unknown>) => unknown;
}

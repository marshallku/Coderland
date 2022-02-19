interface IParsedQuery {
  [key: string]: string | null;
}

interface IQueryObject {
  [key: string]: string | boolean | null | undefined | number;
}

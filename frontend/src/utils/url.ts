export function parseQuery(query: string) {
  const obj: IParsedQuery = {};

  query
    .substring(1)
    .split("&")
    .map((x) => x.split("="))
    .forEach(([key, value]) => {
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    });

  return obj;
}

export function composeQuery(object: IQueryObject): string {
  const filtered = Object.entries(object).filter(([, value]) => {
    const typeOfValue = typeof value;

    if (!value || (typeOfValue !== "number" && typeOfValue !== "string")) {
      return null;
    }

    return `${value}`;
  });

  return `?${new URLSearchParams(
    filtered as Array<[string, string]>
  ).toString()}`;
}

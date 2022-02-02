export default function parseQuery(query: string) {
  const obj: parsedQuery = {};

  query
    .substring(1)
    .split("&")
    .map((x) => decodeURIComponent(x).split("="))
    .forEach(([key, value]) => {
      obj[key] = value;
    });

  return obj;
}

export default function parseQuery(query: string) {
  const obj: parsedQuery = {};

  query
    .substring(1)
    .split("&")
    .map((x) => x.split("="))
    .forEach(([key, value]) => {
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    });

  return obj;
}

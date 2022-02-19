export default function parseCookie(string = document.cookie) {
  return Object.fromEntries(
    string
      .split(";")
      .map((x) => x.split("="))
      .map(([key, value]) => [
        decodeURIComponent(key.trim()),
        decodeURIComponent(value.trim()),
      ])
  );
}

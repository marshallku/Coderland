export function parseCookie(string = document.cookie) {
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

export function deleteCookie(cookies: Array<string>) {
  cookies.forEach((cookie) => {
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
}

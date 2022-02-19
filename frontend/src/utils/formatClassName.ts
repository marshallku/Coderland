export default function formatClassName(...names: Array<unknown>) {
  return names.filter((x) => !!x).join(" ");
}

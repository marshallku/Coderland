import toast from "./toast";

export default function copyToClipboard(string: string): void {
  try {
    navigator.clipboard.writeText(string);
  } catch (error) {
    const textarea = document.createElement("textarea");

    textarea.value = string;
    textarea.classList.add("clipboard");
    document.body.append(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  toast("복사 완료!");
}

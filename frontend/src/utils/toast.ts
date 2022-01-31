import "../css/toast.css";

const DEFAULT_TIMEOUT = 3000;

export default function toast(message: string, timeout = DEFAULT_TIMEOUT) {
  const div = document.createElement("div");

  document.querySelectorAll(".toast").forEach((elt) => elt.remove());

  div.classList.add("toast");
  div.innerText = message;

  document.body.append(div);
  // eslint-disable-next-line no-void
  void div.offsetHeight;
  div.style.opacity = "1";
  div.style.transform = "translate3d(-50%, 0, 0)";

  setTimeout(() => {
    div.addEventListener(
      "transitionend",
      () => {
        div.remove();
      },
      { once: true }
    );
    div.removeAttribute("style");
  }, timeout);
}

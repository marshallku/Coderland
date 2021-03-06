import { useRef, useState } from "react";
import formatClassName from "../utils/formatClassName";
import "./Dropdown.css";

export default function Dropdown({
  ButtonChildren,
  ContentChildren,
  onClick,
}: IDropdownProps) {
  const [opened, setOpened] = useState(false);
  const buttonRef = useRef(null);

  const hideContent = (event?: MouseEvent) => {
    if (event) {
      const { target } = event;

      if (
        buttonRef.current === target ||
        (target instanceof Element &&
          target.matches(".dropdown-content, .dropdown-content *:not(a)"))
      )
        return;
    }

    setOpened(false);
    window.removeEventListener("click", hideContent);
  };

  const openContent = () => {
    setOpened(true);
    onClick?.();
    window.addEventListener("click", hideContent);
  };

  const toggleContent = () => {
    if (opened) {
      hideContent();
    } else {
      openContent();
    }
  };

  return (
    <div className="dropdown-wrap">
      <button
        type="button"
        className="dropdown-button gnb__button"
        onClick={() => {
          toggleContent();
        }}
        ref={buttonRef}
      >
        {ButtonChildren}
      </button>
      <div
        className={formatClassName(
          "dropdown-content",
          opened && "dropdown-content--revealed"
        )}
      >
        {ContentChildren}
      </div>
    </div>
  );
}

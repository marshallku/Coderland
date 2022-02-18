import { useEffect, useRef } from "react";
import Button from "./Button";
import "./Modal.css";

export default function Modal({
  modalContent,
  closeModal,
}: Omit<IModal, "openModal" | "showModal">) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    const { current } = containerRef;
    const { target } = event;

    if (!current || !(target instanceof Node)) {
      return;
    }

    if (!current.contains(target)) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="modal">
      <div className="modal__background">
        <div className="modal__container" ref={containerRef}>
          <div className="modal__text">{modalContent.text}</div>
          <div className="modal__buttons">
            <Button
              value="확인"
              onClick={() => {
                modalContent.cb();
                closeModal();
              }}
            />
            <Button
              value="취소"
              buttonStyle="primary-second"
              onClick={closeModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

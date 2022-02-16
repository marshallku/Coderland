import Button from "./Button";
import "./Modal.css";

export default function Modal({
  modalContent,
  closeModal,
}: Omit<IModal, "openModal" | "showModal">) {
  return (
    <div className="modal">
      <div className="modal__background">
        <div className="modal__container">
          <div className="modal__cancel">
            <button type="button" aria-label="취소" onClick={closeModal}>
              <i className="icon-clear" />
            </button>
          </div>
          <div className="modal__text">{modalContent.text}</div>
          <div className="modal__buttons">
            <Button
              value="확인"
              onClick={() => {
                modalContent.callback();
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

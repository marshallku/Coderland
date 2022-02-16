import { createContext, useContext, useState } from "react";
import Modal from "../components/Modal";

const modalContext = createContext<IModal | null>(null);

function useModalProvider() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<IModalContent>({
    text: "",
    callback: () => {},
  });

  const openModal = ({ text, callback }: IModalContent) => {
    setShowModal(true);
    setModalContent({ text, callback });
  };

  const closeModal = () => setShowModal(false);

  return {
    modalContent,
    showModal,
    openModal,
    closeModal,
  };
}

export function ModalProvider({ children }: { children: JSX.Element }) {
  const modal = useModalProvider();

  return (
    <modalContext.Provider value={modal}>
      {children}
      {modal.showModal && (
        <Modal
          modalContent={modal.modalContent}
          closeModal={modal.closeModal}
        />
      )}
    </modalContext.Provider>
  );
}

export function useModal() {
  return useContext(modalContext);
}

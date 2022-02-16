interface IModalContent {
  text: string;
  callback: () => void;
}

interface IModal {
  modalContent: IModalContent;
  showModal: boolean;
  openModal: (content: IModalContent) => void;
  closeModal: () => void;
}

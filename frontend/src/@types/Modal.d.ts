interface IModalContent {
  text: string;
  cb: () => void;
}

interface IModal {
  modalContent: IModalContent;
  showModal: boolean;
  openModal: (text: string, cb: () => void) => void;
  closeModal: () => void;
}

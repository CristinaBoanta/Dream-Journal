import { Modal } from 'flowbite-react';

interface ReusableModalProps {
  showModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ReusableModal({ showModal, onClose, children }: ReusableModalProps) {
  return (
    <Modal show={showModal} onClose={onClose}>
      {children}
    </Modal>
  );
}
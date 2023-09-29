import { Modal } from 'flowbite-react';

interface ReusableModalProps {
  showModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function ReusableModal({ showModal, onClose, children, className }: ReusableModalProps) {
  return (
    <Modal show={showModal} onClose={onClose}>
      <div className={className}>
        {children}
      </div>
    </Modal>
  );
}
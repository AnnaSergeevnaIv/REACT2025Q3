import { useState, type ReactNode } from 'react';
import FormSwitchButtons from '../../components/FormSwitchButtons';
import Modal from '../../components/Modal';

export default function MainPage() {
  const [form, setForm] = useState<ReactNode>(<></>);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <FormSwitchButtons setForm={setForm} setIsModalOpen={setIsModalOpen} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {form}
      </Modal>
    </div>
  );
}

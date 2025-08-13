import { useState } from 'react';
import FormSwitchButtons from '../../components/FormSwitchButtons';
import Modal from '../../components/Modal';
import UncontrolledForm from '../../components/UncontrolledForm';
import ReactHookForm from '../../components/ReactHookForm';
import FormDataDisplay from '../../components/FormDataDisplay';

export default function MainPage() {
  const [isFormUncontrolled, setIsFormUncontrolled] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <FormSwitchButtons
        setIsFormUncontrolled={setIsFormUncontrolled}
        setIsModalOpen={setIsModalOpen}
      />
      <FormDataDisplay />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isFormUncontrolled ? (
          <UncontrolledForm setIsModalOpen={setIsModalOpen} />
        ) : (
          <ReactHookForm setIsModalOpen={setIsModalOpen} />
        )}
      </Modal>
    </div>
  );
}

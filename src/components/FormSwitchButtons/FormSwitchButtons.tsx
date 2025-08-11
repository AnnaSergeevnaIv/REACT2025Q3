import type { ReactNode } from 'react';
import ReactHookForm from '../ReactHookForm';
import UncontrolledForm from '../UncontrolledForm';
import { BUTTONS_CONTAINER_CLASS } from './FormSwitchButtons.constants';
import './FormSwitchButtons.css';

interface FormSwitchButtonsProps {
  setForm: (node: ReactNode) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function FormSwitchButtons({
  setForm,
  setIsModalOpen,
}: FormSwitchButtonsProps) {
  return (
    <div className={BUTTONS_CONTAINER_CLASS}>
      <button
        onClick={() => {
          setForm(<UncontrolledForm />);
          setIsModalOpen(true);
        }}
      >
        Open Uncontrolled Form
      </button>
      <button
        onClick={() => {
          setForm(<ReactHookForm />);
          setIsModalOpen(true);
        }}
      >
        Open React Hook Form
      </button>
    </div>
  );
}

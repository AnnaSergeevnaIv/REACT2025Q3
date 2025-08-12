import { BUTTONS_CONTAINER_CLASS } from './FormSwitchButtons.constants';
import './FormSwitchButtons.css';

interface FormSwitchButtonsProps {
  setIsFormUncontrolled: (value: boolean) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function FormSwitchButtons({
  setIsFormUncontrolled,
  setIsModalOpen,
}: FormSwitchButtonsProps) {
  return (
    <div className={BUTTONS_CONTAINER_CLASS}>
      <button
        onClick={() => {
          setIsFormUncontrolled(true);
          setIsModalOpen(true);
        }}
      >
        Open Uncontrolled Form
      </button>
      <button
        onClick={() => {
          setIsFormUncontrolled(false);
          setIsModalOpen(true);
        }}
      >
        Open React Hook Form
      </button>
    </div>
  );
}

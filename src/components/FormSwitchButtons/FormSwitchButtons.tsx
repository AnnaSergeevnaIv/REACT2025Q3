import {
  BUTTON_REACT_HOOK_FORM,
  BUTTON_UNCONTROLLED_FORM,
  BUTTONS_CONTAINER_CLASS,
} from './FormSwitchButtons.constants';
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
        {BUTTON_UNCONTROLLED_FORM}
      </button>
      <button
        onClick={() => {
          setIsFormUncontrolled(false);
          setIsModalOpen(true);
        }}
      >
        {BUTTON_REACT_HOOK_FORM}
      </button>
    </div>
  );
}

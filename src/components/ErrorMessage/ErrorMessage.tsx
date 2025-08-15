import { ERROR_MESSAGE_CLASS } from './ErrorMessage.constants';
import './ErrorMessage.css';

export default function ErrorMessage({ message = '' }: { message: string }) {
  return <p className={ERROR_MESSAGE_CLASS}>{message}</p>;
}

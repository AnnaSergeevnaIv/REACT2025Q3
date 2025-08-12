import { createPortal } from 'react-dom';
import { MODAL_CONTENT_CLASS, MODAL_OVERLAY_CLASS } from './Modal.constants';
import { Fragment, type MouseEventHandler } from 'react';
import { useEffect } from 'react';
import './Modal.css';

export default function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  const contentClickHandle: MouseEventHandler = (e) => e.stopPropagation();
  if (!isOpen) return null;

  return createPortal(
    <Fragment>
      <div className={MODAL_OVERLAY_CLASS} onClick={onClose}>
        <div
          className={MODAL_CONTENT_CLASS}
          aria-modal="true"
          role="dialog"
          onClick={contentClickHandle}
        >
          {children}
        </div>
      </div>
    </Fragment>,
    document.body
  );
}

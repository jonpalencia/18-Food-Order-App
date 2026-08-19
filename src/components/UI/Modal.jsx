import { useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { userProgressContext } from '../../store/userProgressContext';

export default function Modal({ children, open, onClose, className = '' }) {
  const dialog = useRef();
  const { hideCart, hideCheckout } = useContext(userProgressContext);

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }

    return () => {
      modal.close();
    };
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal'),
  );
}

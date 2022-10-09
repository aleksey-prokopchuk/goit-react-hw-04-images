import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from "react-dom";
import css from '../Modal/Modal.module.css';

const modalRoot = document.getElementById('modal-root');
const { overlay, modal } = css;

function Modal({children, onClose}) {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      onClose();
    };
  };

  return createPortal(
    <div className={overlay} onClick={closeModal}>
      <div className={modal}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  items: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};
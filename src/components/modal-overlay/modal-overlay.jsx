import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from '../modal';
import styles from './modal-overlay.module.css';

const modalRoot = document.getElementById('react-modals');

const ModalOverlay = ({ setModalActive, modalType, ingredientData }) => {
  const escFunction = (e) => {
    if (e.keyCode === 27) {
      setModalActive(false)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    }
  }, []);
  
  return ReactDOM.createPortal(
    (
      <div className={styles.overlay} onClick={() => setModalActive(false)}>
        <Modal
          setModalActive={setModalActive}
          modalType={modalType}
          ingredientData={ingredientData}
        />
      </div>
    ),
    modalRoot
  );
}

export default ModalOverlay
import React, { FC, useEffect } from 'react';

import styles from './modal-overlay.module.css';
import { ESC_KEYCODE } from '../../utils/constants';

type TModalOverlayProps = {
  handleModalClose: () => void,
  children: React.ReactNode,
};

const ModalOverlay: FC<TModalOverlayProps> = ({ handleModalClose, children }) => {
  const escFunction = (e: any) => {
    if (e.keyCode === ESC_KEYCODE) {
      handleModalClose();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    }
  }, []);
  
  return (
    <div className={styles.overlay} onClick={handleModalClose}>
      {children}
    </div>
  );
}

export default ModalOverlay
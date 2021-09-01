import { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';
import { ESC_KEYCODE } from '../../utils/constants';

const ModalOverlay = ({ handleModalClose, children }) => {
  const escFunction = (e) => {
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

ModalOverlay.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default ModalOverlay
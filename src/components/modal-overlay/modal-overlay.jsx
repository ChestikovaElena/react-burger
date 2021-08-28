import { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';
import { ESC_KEYCODE } from '../../utils/constants';

const ModalOverlay = ({ handleCloseClick, children }) => {
  const escFunction = (e) => {
    if (e.keyCode === ESC_KEYCODE) {
      handleCloseClick();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    }
  }, []);
  
  return (
    <div className={styles.overlay} onClick={handleCloseClick}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  handleCloseClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default ModalOverlay
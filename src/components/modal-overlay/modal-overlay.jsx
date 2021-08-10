import { useEffect } from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ handleCloseClick, children }) => {
  const escFunction = (e) => {
    if (e.keyCode === 27) {
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
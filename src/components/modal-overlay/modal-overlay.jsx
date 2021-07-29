import React, { useEffect } from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ setModalActive, children }) => {
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
  
  return (
    <div className={styles.overlay} onClick={() => setModalActive(false)}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  setModalActive: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  // ingredientData: PropTypes.shape({
  //   image: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   calories: PropTypes.number.isRequired,
  //   proteins: PropTypes.number.isRequired,
  //   fat: PropTypes.number.isRequired,
  //   carbohydrates: PropTypes.number.isRequired
  // })
}

export default ModalOverlay
import { createPortal } from 'react-dom';
import { useCallback } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay';
import styles from './modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ setModalActive, title, children }) => {
  const handleCloseClick = useCallback(
    () => {
      setModalActive(false);
    }, [setModalActive]
  )

  return createPortal(
    (
      <ModalOverlay handleCloseClick={handleCloseClick}>
        <div className={`pt-10 pr-10 pb-15 pl-10 ${styles.modal}`} onClick={e => e.stopPropagation()}>
          <div className={styles.modal_row}>
            <h2 className="text text_type_main-large">
              {title}
            </h2>
            <div className={styles.icon_wrapper} onClick={handleCloseClick}>
              <CloseIcon type="primery"/>
            </div>
          </div>
          <div className={title !== 'Детали ингредиента' ? styles.wrapper : styles.wrapper_ingredient }>
            {children}
          </div>
        </div>
      </ModalOverlay>
    ),
    modalRoot
  );
}

Modal.propTypes = {
  setModalActive: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
}

export default Modal
import React, { FC } from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

type TModalProps = {
  handleModalClose: () => void,
  title?: string,
  children: React.ReactNode,
  width?: string,
};

const Modal: FC<TModalProps> = ({ handleModalClose, title, children, width }) => {
  return createPortal(
    (
      <ModalOverlay handleModalClose={handleModalClose}>
        <div
          className={`pt-10 pr-10 pb-15 pl-10 ${styles.modal}`}
          onClick={e => e.stopPropagation()}
        >
          <div className={styles.modal_row}>
            <h2 className="text text_type_main-large">
              {title}
            </h2>
            <div className={styles.icon_wrapper} onClick={handleModalClose}>
              <CloseIcon type="primary"/>
            </div>
          </div>
          <div className={`${styles.wrapper } ${width && styles.wrapper_wide}`}>
            {children}
          </div>
        </div>
      </ModalOverlay>
    ),
    modalRoot as HTMLDivElement
  );
}

export default Modal
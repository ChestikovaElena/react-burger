import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('react-modals');

export default class Modal extends React.Component {
  render() {
    return ReactDOM.createPortal(
      (
        <div className={`pt-10 pr-10 pb-15 pl-10 ${styles.modal}`}>
          <h2 className="text text_type_main-large">Заголовок</h2>
          <div className={styles.icon_wrapper}>
            <CloseIcon type="primery"/>
          </div>
        </div>
      ),
      modalRoot
    );
  }
}
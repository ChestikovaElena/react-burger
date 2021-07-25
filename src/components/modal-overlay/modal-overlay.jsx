import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../modal';
import styles from './modal-overlay.module.css';

const modalRoot = document.getElementById('react-modals');

export default class ModalOverlay extends React.Component {
  escFunction = (e) => {
    if (e.keyCode === 27) {
      this.props.setModalActive(false)
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  render() {
    return ReactDOM.createPortal(
      (
        <div className={styles.overlay} onClick={() => this.props.setModalActive(false)}>
          <Modal setModalActive={this.props.setModalActive} />
        </div>
      ),
      modalRoot
    );
  }
}

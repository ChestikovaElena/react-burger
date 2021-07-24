import Modal from '../modal';
import styles from './modal-overlay.module.css';

const ModalOverlay = () => {
  return (
    <div className={styles.overlay}>
      <Modal />
    </div>
  );
}

export default ModalOverlay
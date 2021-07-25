import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({ setModalActive }) => {
  return (
    <div className={`pt-10 pr-10 pb-15 pl-10 ${styles.modal}`} onClick={e => e.stopPropagation()}>
      <h2 className="text text_type_main-large">Заголовок</h2>
      <div className={styles.icon_wrapper} onClick={() => setModalActive(false)}>
        <CloseIcon type="primery"/>
      </div>
    </div>
  );
}

export default Modal
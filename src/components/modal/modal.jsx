import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details';
import IngredientDetails from '../ingredient-details';
import styles from './modal.module.css';

const Modal = ({ setModalActive, modalType, ingredientData }) => {
  return (
    <div className={`pt-10 pr-10 pb-15 pl-10 ${styles.modal}`} onClick={e => e.stopPropagation()}>
      <div className={styles.modal_row}>
        <h2 className="text text_type_main-large">
          {modalType === 'orderDetails' ? '' : 'Детали ингредиента'}
        </h2>
        <div className={styles.icon_wrapper} onClick={() => setModalActive(false)}>
          <CloseIcon type="primery"/>
        </div>
      </div>
      {modalType === 'orderDetails'
        ?
          <OrderDetails />
        :
          <IngredientDetails ingredientData={ingredientData}/>
      }
    </div>
  );
}

export default Modal
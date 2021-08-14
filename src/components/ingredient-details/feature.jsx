import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

export const productFeatures = [
  {
    id: 0,
    name: 'Калории',
    measure: 'ккал',
    valueName: 'calories'
  },
  {
    id: 1,
    name: 'Белки',
    measure: 'г',
    valueName: 'proteins'
  },
  {
    id: 2,
    name: 'Жиры',
    measure: 'г',
    valueName: 'fat'
  },
  {
    id: 3,
    name: 'Углеводы',
    measure: 'г',
    valueName: 'carbohydrates'
  },
];

export const Feature = ({ name, measure, value }) => {
  return (
    <li className='text text_type_main-default text_color_inactive'>
      <div className={`${styles.feature_row}`}>
        <span>{`${name},`}</span>
        <span>{measure}</span>
      </div>
      <span>{value}</span>
    </li>
  )
}

export const ListOfFeatures = ({ children }) => {
  return (
    <ul className={styles.features}>
      {children}
    </ul>
  );
}

Feature.propTypes = {
  name: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}
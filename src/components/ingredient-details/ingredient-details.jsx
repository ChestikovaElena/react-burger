import styles from './ingredient-details.module.css';

const productFeatures = [
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

const Feature = ({ name, measure, value }) => {
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

const ListOfFeatures = ({ children }) => {
  return (
    <ul className={styles.features}>
      {children}
    </ul>
  );
}

const IngredientDetails = ({ ingredientData }) => {
  return (
    <div className={styles.wrapper}>
      <img src={ingredientData.image} alt={ingredientData.name} className='mb-4'/>
      <h3 className='text text_type_main-medium mb-8'>{ingredientData.name}</h3>
      <ListOfFeatures
        children =
          {productFeatures.map(
            item =>
            <Feature key={item.id} name={item.name} measure={item.measure} value={ingredientData[item.valueName]}/>
          )}
      />
    </div>
  );
}

export default IngredientDetails;
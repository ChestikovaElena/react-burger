import AppHeader from '../../components/app-header';
import BurgerIngredients from '../../components/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor';
import styles from'./home-page.module.css';
import PropTypes from 'prop-types';

const HomePage = ({ data, isLoading, hasError }) => {
  return (
    <>
      <AppHeader />
      <main className={ styles.main }>
        {data!==[] && !isLoading && !hasError && <BurgerIngredients data={data}/>}
        {data!==[] && !isLoading && !hasError && <BurgerConstructor data={data}/>}
      </main>
    </>
  );
}

const ingredientPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
})

HomePage.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ingredient: ingredientPropTypes})).isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
}

export default HomePage;
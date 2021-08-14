import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Card } from './card';
import { BlockList } from './block-list';

export const Block = ({ data, name, type, handleClick, refBun, refSauce, refMain, countOfIngredients }) =>{
  return (
    <li className={`mt-10 ${styles.block}`} data-id={type}
      ref={type==='bun' ? refBun : type==='sauce' ? refSauce : refMain}>
      <h3 className='text text_type_main-medium pb-6'>{name}</h3>
      <BlockList 
        children = {
          data.filter(item => item.type === type)
          .map((item) =>
            <li
              key={`${item._id}`}
              className={ `${styles.block_item} mb-8` }
              data-id={item._id} data-type={type} onClick={handleClick}
            >
              <Card
                image={item.image_large} name={item.name} type={type}
                count={countOfIngredients[item._id] || 0} price={item.price} id={item._id}
              />
            </li>
          )
        }
      />
    </li>
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

Block.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ingredient: ingredientPropTypes})).isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  refBun: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  refSauce: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  refMain: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  countOfIngredients: PropTypes.objectOf(PropTypes.number),
}

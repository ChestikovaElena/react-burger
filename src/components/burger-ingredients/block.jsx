import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Card } from './card';
import { BlockList } from './block-list';

export const Block = ({ data, name, type, handleClick, refBun, refSauce, refMain }) =>{
  return (
    <li className={`mt-10 ${styles.block}`} data-id={type}
      ref={type==='bun' ? refBun : type==='sauce' ? refSauce : refMain}>
      <h3 className='text text_type_main-medium pb-6'>{name}</h3>
      <BlockList 
        children = {
          data.filter(item => item.type === type)
          .map((item) =>
            <Card
              key={`${item._id}`} image={item.image_large} name={item.name}
              price={item.price} id={item._id} handleClick={handleClick}
            />)
        }
      />
    </li>
  );
}

Block.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

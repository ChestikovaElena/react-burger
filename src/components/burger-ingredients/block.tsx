import { FC, RefObject } from 'react';

import styles from './burger-ingredients.module.css';
import { Card } from './card';
import { BlockList } from './block-list';

type TIngredient = {
  _id: string,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number,
  type: string,
}

type TBlock = {
  data: Array<TIngredient>,
  name: string,
  type: string,
  refBun: RefObject<HTMLLIElement>,
  refSauce: RefObject<HTMLLIElement>
  refMain: RefObject<HTMLLIElement>,
  countOfIngredients: {[ingredientID in string]: number},
};

export const Block: FC<TBlock> = ({ data, name, type, refBun, refSauce, refMain, countOfIngredients }) =>{
  return (
    <li className={`mt-10 ${styles.block}`} data-id={type}
      ref={type==='bun' ? refBun : type==='sauce' ? refSauce : refMain}>
      <h3 className='text text_type_main-medium pb-6'>{name}</h3>
      <BlockList 
        children = {
          data.filter((item: TIngredient) => item.type === type)
          .map((item: TIngredient) =>
            <li
              key={`${item._id}`}
              className={ `${styles.block_item} mb-8` }
              data-id={item._id} data-type={type}
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

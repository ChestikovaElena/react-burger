import { useMemo, useState, useRef, UIEvent } from 'react';
import { useSelector } from '../../services/hooks';

import styles from './burger-ingredients.module.css';
import { Tabs } from './tabs';
import { Block } from './block';
import { ListOfBlocks } from './list-of-blocks';
import Preloader from '../preloader';
import { TTab, typeOfIngredients } from './type-of-ingredients';

const BurgerIngredients = () => {
  const { data, dataRequest, dataFailed, dataSelected } = useSelector((state) => ({
    data: state.data.data,
    dataRequest: state.data.dataRequest,
    dataFailed: state.data.dataFailed,
    dataSelected: state.dataSelected.dataSelected
  }));
  
  const refContainer = useRef<HTMLDivElement>(null);
  const refBun = useRef<HTMLLIElement>(null);
  const refSauce = useRef<HTMLLIElement>(null);
  const refMain = useRef<HTMLLIElement>(null);

  const [current, setCurrent] = useState<TTab | string>('bun');
  
  const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
    let currentTab: TTab = 'bun';
    if ( refContainer.current && refBun.current && refSauce.current) {
      currentTab =
        refContainer.current.scrollTop-refBun.current.clientHeight<0 ? 'bun'
        :
          refContainer.current.scrollTop-refBun.current.clientHeight-refSauce.current.clientHeight<0 ? 'sauce'
          : 'main';
    }
    
    setCurrent(currentTab);
  }

  const setTab = (tab: TTab | string) => {
    setCurrent(tab);
    const element =
      tab === 'bun' ? refBun.current : tab === 'sauce' ? refSauce.current : refMain.current;
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }

  const countOfIngredients = useMemo(
    ()=> {
      type TIngr = {[ingredientID in string]: number};
      const counters: TIngr = {};
      dataSelected.forEach((ingredient) => {
        if (!counters[ingredient._id]) counters[ingredient._id] = 0;
        counters[ingredient._id]++;
        if (ingredient.type === 'bun') counters[ingredient._id] = 2;
      });
    return counters;
    },
    [dataSelected]
  );
  
  const content = useMemo(
    () => {
      return dataRequest ? (
        <Preloader />
      ) : (
        dataFailed ? (
          <div className="text text_type_main-large">Произошла ошибка. Перезагрузите браузер.</div>
        ) : (
          <>
            <h2 className='text text_type_main-large pb-5'>Соберите бургер</h2>
            <Tabs current={current} setTab={setTab}/>
            <ListOfBlocks
              refContainer={refContainer}
              scrollHandler={scrollHandler}
            >
              {typeOfIngredients.map(
                (item, index) =>
                  <Block
                    key={`block${index}`}
                    type={item.type}
                    name={item.name}
                    data={data}
                    refBun={refBun}
                    refSauce={refSauce}
                    refMain={refMain}
                    countOfIngredients={countOfIngredients}
                  />
              )}
            </ListOfBlocks>
          </>
        )
      )
    },
    [data, dataRequest, dataFailed, current, countOfIngredients]
  );

  return (
    <>
      <section className={`${styles.column} pt-10 mr-10`}>
        {content}
      </section>
    </>
  );
}

export default BurgerIngredients
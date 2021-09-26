import { FC, ReactElement, RefObject, UIEvent } from 'react';

import styles from './burger-ingredients.module.css';

type TListOfBlockProps = {
  children: Array<ReactElement>,
  refContainer: RefObject<HTMLDivElement>,
  scrollHandler: (e: UIEvent<HTMLDivElement>) => void,
}

export const ListOfBlocks: FC<TListOfBlockProps> = ({ children, refContainer, scrollHandler }) => {
  return (
    <div
      className={ `pr-2 ${styles.blocks_container}`}
      ref={refContainer}
      onScroll={scrollHandler}
      data-id='container'>
      <ul className={`${styles.list}`}>
        {children}
      </ul>
    </div>
  );
}


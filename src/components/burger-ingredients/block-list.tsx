import { FC, ReactElement } from 'react';

import styles from './burger-ingredients.module.css';

type TBlockListProps = {
  children: Array<ReactElement>,
}

export const BlockList: FC<TBlockListProps> = ({ children }) => {
  return (
    <ul className={`${styles.block_list} ml-4`}>
      {children}
    </ul>
  );
}

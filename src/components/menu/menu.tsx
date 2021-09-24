import { FC } from 'react';

import styles from './menu.module.css';

type TMenuProps = {
  children: React.ReactNode,
  style: string
}

const Menu: FC<TMenuProps> = ({ children, style }) => {
  return (
    <nav className={ styles.menu }>
      <ul className=
        { style === 'row' ? styles.menu_row : styles.menu_column }>
        {children}
      </ul>
    </nav>
  );
}

export default Menu
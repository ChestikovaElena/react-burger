import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';
import styles from './nav-item.module.css';

type TNavItemProps = {
  children: React.ReactNode,
  link: string,
};

export const NavItem: FC<TNavItemProps> = ({ children, link}) => {
  return (
    <NavLink
      exact
      to={{ pathname: link }}
      className={`text text_type_main-medium text_color_inactive ${styles.item}`}
      activeClassName={`text text_type_main-medium ${styles.item_active}`}
    >
      {children}
    </NavLink>
  );
}

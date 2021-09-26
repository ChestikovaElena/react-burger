import { FC, ReactElement } from 'react';

import styles from './element-with-icon.module.css';

type TElementWithIconProps = {
  icon: ReactElement,
  text: string,
  type?: string
}

const ElementWithIcon: FC<TElementWithIconProps> = ({ icon, text, type }) => {
  return (
    <div className={`pr-5 pl-5 ${styles.link}`}>
      <div className={ styles.link_icon }>{icon}</div>
      {text && <span className={`text text_type_main-default pl-2 ${type}`}>{text}</span>}
    </div>
  );
}

export default ElementWithIcon
import { FC } from 'react';

import ElementWithIcon from '../element-with-icon';

type TMenuItem = {
  icon: React.ReactElement,
  text: string,
  type: string,
}

const MenuItem: FC<TMenuItem> = ({ icon, text, type }) => {
  return (
    <li className='mr-2'>
      <ElementWithIcon icon={icon} text={text} type={type}/>
    </li>
  );
}

export default MenuItem
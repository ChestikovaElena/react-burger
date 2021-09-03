import PropTypes from 'prop-types';

import ElementWithIcon from '../element-with-icon';

const MenuItem = ({ icon, text, type, link }) => {
  return (
    <li className='mr-2'>
      <ElementWithIcon icon={icon} text={text} type={type} link={link}/>
    </li>
  );
}

MenuItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string,
  type: PropTypes.string,
  link: PropTypes.string,
}

export default MenuItem
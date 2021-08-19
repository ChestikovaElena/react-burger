import ElementWithIcon from '../element-with-icon';
import PropTypes from 'prop-types';

const MenuItem = (props) => {
  return (
    <li className='mr-2'>
      <ElementWithIcon icon={props.icon} text={props.text} type={props.type} link={props.link}/>
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
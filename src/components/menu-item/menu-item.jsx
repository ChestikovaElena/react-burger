import ElementWithIcon from '../element-with-icon';
import PropTypes from 'prop-types';

const MenuItem = (props) => {
  return (
    <li>
      <ElementWithIcon icon={props.icon} text={props.text} type={props.type}/>
    </li>
  );
}

MenuItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string,
  type: PropTypes.string
}

export default MenuItem
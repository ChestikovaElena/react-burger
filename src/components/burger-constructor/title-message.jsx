import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';

export const TitleMessage = ({ text, marginTop }) => {
  return (
    <p className=
      {
        `text text_type_main-default text_color_inactive mt-${marginTop} ml-8 pt-5 pb-5 
        ${styles.title_message}`
      }
    >
      {text}
    </p>
  );
}

TitleMessage.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  marginTop: PropTypes.string,
}

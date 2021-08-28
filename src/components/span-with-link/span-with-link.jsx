import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './span-with-link.module.css';

export const SpanWithLink = ({ buttonText, link, spanText, mb }) => {
  const history = useHistory();

  const goToLink = useCallback(
    () => {
        history.replace({ pathname: link });
    },
    [history, link]
  );

  return (
    <p className={`mb-${ mb } ${ styles.link }`}>
      <span className="text text_type_main-default text_color_inactive mr-2">
        { spanText }
      </span>
      <Button type="secondary" size="medium" onClick={ goToLink }>
        { buttonText }
      </Button>
    </p>
  )
}

SpanWithLink.propTypes = {
  buttonText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  spanText: PropTypes.string.isRequired,
  mb: PropTypes.string.isRequired,
}
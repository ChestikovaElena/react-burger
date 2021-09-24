import { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './span-with-link.module.css';

type TSpanWithLinkProps = {
  buttonText: string,
  link: string,
  spanText: string,
  mb: string
}

export const SpanWithLink: FC<TSpanWithLinkProps> = ({ buttonText, link, spanText, mb }) => {
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

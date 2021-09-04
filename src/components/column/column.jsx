import { useMemo } from 'react';
import Preloader from '../preloader';
import PropTypes from 'prop-types';

import styles from './column.module.css';

export const Column = ({ request, requestFailed, title, children }) => {
  const content = useMemo(
    () => {
      return request ? (
        <Preloader />
      ) : (
        requestFailed ? (
          <div className="text text_type_main-large">Произошла ошибка. Перезагрузите браузер.</div>
        ) : (
          <>
            <h2 className='text text_type_main-large pb-5'>{title}</h2>
            <div
              className={ `pr-2 ${styles.blocks_container}`}
              data-id='container'
            >
              <ul className={`${styles.blocks_list}`}>
                {children}
              </ul>
            </div>
          </>
        )
      )
    },
    [request, requestFailed]
  );

  return (
    <>
      <section className={`${styles.column} pt-10 mr-10`}>
        {content}
      </section>
    </>
  );
}

Column.propTypes = {
  children: PropTypes.array.isRequired
}
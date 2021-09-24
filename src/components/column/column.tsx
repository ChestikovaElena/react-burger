import { FC, ReactElement, useMemo } from 'react';

import Preloader from '../preloader';
import styles from './column.module.css';

type TColumnProps = {
  children: React.ReactNode,
  request: boolean,
  requestFailed: boolean,
  title?: string | null,
  type: string,
}

export const Column: FC<TColumnProps> = ({ children, request, requestFailed, title, type }) => {
  const content = useMemo(
    () => {
      return request ? (
        <Preloader />
      ) : (
        requestFailed ? (
          <div className="text text_type_main-large">Произошла ошибка. Перезагрузите браузер.</div>
        ) : (
          <>
            {type === "right" ? (
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
            ) : (
              <>
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
            }
          </>
        )
      )
    },
    [request, requestFailed]
  );

  return (
    <>
      <section
        className=
          {type === "right"
            ? `${styles.column} pt-10 mr-15`
            : type === "none"
              ? `${styles.column} ${styles.column_mt_none}`
              : `${styles.column} pt-25`}>
        {content}
      </section>
    </>
  );
}

import { FC } from "react";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./total-price.module.css";

type TTotalPrice = {
  totalPrice: number;
  type: string;
  count?: number;
};

export const TotalPrice: FC<TTotalPrice> = ({ count, totalPrice, type }) => {
  let paddingRight, spanStyle;
  if (type === "large") {
    paddingRight = "pr-10";
    spanStyle = "text_type_digits-medium";
  } else {
    spanStyle = "text_type_digits-default";
  }
  return (
    <div className={`${styles.total} ${paddingRight}`}>
      <span className={`text ${spanStyle} pr-2`}>
        {count ? `${count} x ${totalPrice}` : `${totalPrice}`}
      </span>
      <div
        className={
          type === "large" ? `${styles.icon_big}` : `${styles.icon_def}`
        }
      >
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

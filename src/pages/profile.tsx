import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../services/hooks";

import NavItem from "../components/nav-item";
import Menu from "../components/menu";
import styles from "./profile.module.css";
import { logOut } from "../services/actions/user";
import { processOrders } from "../utils/process-orders";
import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_UPDATE_ORDER,
} from "../services/actions/ws";

type TProfileProps = {
  children: React.ReactNode;
  textInfo: string;
};

export const ProfilePage: FC<TProfileProps> = ({ children, textInfo }) => {
  const dispatch = useDispatch();
  const { data, orders } = useSelector((store) => ({
    data: store.data.data,
    orders: store.wsUser.orders,
  }));

  useEffect(() => {
    dispatch({
      type: WS_USER_CONNECTION_START,
    });

    return () => {
      dispatch({
        type: WS_USER_CONNECTION_CLOSED,
      });
    };
  }, []);

  useEffect(() => {
    async function getOrder() {
      const ordersNoUpdating = orders.filter((item) => !item.isUpdateOrder);
      if (orders && orders.length !== 0 && ordersNoUpdating.length !== 0) {
        const updateOrder = await processOrders(
          data,
          ordersNoUpdating,
          "wsUser"
        );
        if (updateOrder && updateOrder.ingredients) {
          dispatch({
            type: WS_USER_UPDATE_ORDER,
            updateOrder,
          });
        }
      }
    }
    getOrder();
  }, [orders]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logOut());
  };

  return (
    <section className={`pt-30 ${styles.section}`}>
      <div className={`mr-15 ${styles.left_column}`}>
        <aside>
          <Menu
            style="column"
            children={[
              {
                text: "Профиль",
                link: "/profile",
              },
              {
                text: "История заказов",
                link: "/profile/orders",
              },
              {
                text: "Выход",
                link: "/login",
                onClickFunction: handleClick,
              },
            ].map((item, index) => (
              <li className={`${styles.wrapper_item}`} key={`menu${index}`}>
                {!item.onClickFunction ? (
                  <NavItem link={item.link}>
                    <span>{item.text}</span>
                  </NavItem>
                ) : (
                  <button
                    className={`text text_type_main-medium text_color_inactive &{styles.menu_item}`}
                    onClick={item.onClickFunction}
                  >
                    {item.text}
                  </button>
                )}
              </li>
            ))}
          />
        </aside>
        <p className="mt-20 text text_type_main-default text_color_inactive">
          {textInfo}
        </p>
      </div>
      {children}
    </section>
  );
};

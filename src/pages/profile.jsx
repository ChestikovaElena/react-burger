import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NavItem from "../components/nav-item";
import Menu from "../components/menu";
import styles from "./profile.module.css";
import { logOut } from '../services/actions/user';
import {
  WS_USER_CONNECTION_START
} from '../services/actions/ws';
import { processOrders } from '../utils/process-orders';

export const ProfilePage = ({ children, textInfo }) => {
  const dispatch = useDispatch();
  const { data, orders, wsConnected} = useSelector((store) => ({
    data: store.data.data,
    orders: store.wsUser.orders,
    wsConnected: store.wsUser.wsConnected,
  }));

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logOut());
  }

  // useEffect(
  //   () => {
  //     if (!wsConnected) {
  //       dispatch({
  //         type: WS_USER_CONNECTION_START
  //       })
  //     }
  //   },
  //   []
  // );

  // useEffect(
  //   () => {
  //     if (orders && orders.length !== 0) {
  //       processOrders(data, dispatch, orders, "user")
  //     };
  //   },
  //   [orders]
  // )

  return (
    <section className={`pt-30 ${styles.section}`}>
      <div className={ `mr-15 ${styles.left_column}` }>
        <aside>
          <Menu
              style="column"
              children={[
                {
                  text: "Профиль",
                  link: "/profile"
                },
                {
                  text: "История заказов",
                  link: "/profile/orders"
                },
                {
                  text: "Выход",
                  link: "/login",
                  onClickFunction: handleClick
                }
              ]
              .map((item, index) =>
                <li
                  className={`${styles.wrapper_item}`}
                  key={`menu${index}`}
                >
                  {!item.onClickFunction ? (
                    <NavItem
                      link={item.link}
                    >
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
              )
            }
          />
        </aside>
        <p className="mt-20 text text_type_main-default text_color_inactive">
          {textInfo}
        </p>
      </div>
      {children}
    </section>
  )
}
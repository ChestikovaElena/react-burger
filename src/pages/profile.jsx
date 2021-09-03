import { useDispatch } from 'react-redux';

import NavItem from "../components/nav-item";
import Menu from "../components/menu";
import ProfileForm from "../components/profile-form";
import styles from "./profile.module.css";
import { logOut } from '../services/actions/user';

export const ProfilePage = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logOut());
  }

  return (
    <section className={`mt-30 ${styles.section}`}>
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
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <ProfileForm />
    </section>
  )
}
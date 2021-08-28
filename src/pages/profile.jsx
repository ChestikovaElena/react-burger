import NavItem from "../components/nav-item";
import Menu from "../components/menu";
import ProfileForm from "../components/profile-form";
import styles from "./profile.module.css";

export const ProfilePage = () => {
  return (
    <section className={`mt-30 ${styles.section}`}>
      <div className={ styles.left_column }>
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
                  isLogOut: true
                }
              ]
              .map((item, index) =>
                <li
                  className={`${styles.wrapper_item}`}
                  key={`menu${index}`}
                >
                  <NavItem
                    link={item.link}
                    isLogOut={item.isLogOut}
                  >
                    <span>{item.text}</span>
                  </NavItem>
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
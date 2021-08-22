import NavItem from "../components/nav-item";
import Menu from "../components/menu";
import ProfileForm from "../components/profile-form";
import styles from "./profile-page.module.css";

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
                  link: "/login"
                }
              ]
              .map((item, index) =>
                <NavItem
                  key={`menu${index}`}
                  text={item.text}
                  link={item.link}
                />
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
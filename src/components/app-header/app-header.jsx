import {
  Logo,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import {ICON_BURGER_ACTIVE, ICON_LIST_INACTIVE} from '../icons/icons.js';
import ElementWithIcon from '../element-with-icon';
import MenuItem from '../menu-item';
import Menu from '../menu';

const AppHeader = () =>{
  return (
    <div className={ styles.container }>
      <header className="header">
        <div className="pt-4 pb-4">
          <div className={ styles.header_content}>
            <Menu
              style = "row"
              children={[
                {
                  icon: ICON_BURGER_ACTIVE,
                  text: "Конструктор",
                  type: "",
                  link: "/"
                },
                {
                  icon: ICON_LIST_INACTIVE,
                  text: "Лента заказов",
                  type: "text_color_inactive",
                  link: "/list-orders"
                }
              ]
              .map((item, index) =>
                <MenuItem
                  key={`menu${index}`}
                  icon={item.icon}
                  text={item.text}
                  type={item.type}
                  link={item.link}
                />
              )
            }/>
            <div className={styles.elements_wrapper}>
              <Logo/>
              <ElementWithIcon
                icon={<ProfileIcon type="secondary"/>}
                text={"Личный кабинет"}
                type="text_color_inactive"
                link={'/profile'}
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default AppHeader;
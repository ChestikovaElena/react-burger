import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Logo,
  ProfileIcon,
  ListIcon,
  BurgerIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import ElementWithIcon from '../element-with-icon';
import NavItem from '../nav-item';
import Menu from '../menu';

const AppHeader = () =>{
  const { isLoggedIn } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn
  }));

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.container }>
        <header className="header">
          <div className="pt-4 pb-4">
            <div className={ styles.header_content}>
              <Menu
                style = "row"
                children={[
                  {
                    icon: <BurgerIcon type="secondary"/>,
                    text: "Конструктор",
                    link: "/"
                  },
                  {
                    icon: <ListIcon type="secondary"/>,
                    text: "Лента заказов",
                    link: "/list-orders"
                  }
                ]
                .map((item, index) =>
                  <li
                    className='mr-2'
                    key={`menu${index}`}
                  >
                    <NavItem link={item.link}>
                      <ElementWithIcon
                        icon={item.icon}
                        text={item.text}
                      />
                    </NavItem>
                  </li>
                )
              }/>
              <div className={styles.elements_wrapper}>
                <Link to={"/"}>
                  <Logo/>
                </Link>
                <NavItem link={isLoggedIn ? '/profile' : '/login'}>
                  <ElementWithIcon
                    icon={isLoggedIn ? <ProfileIcon type="secondary"/> : <ListIcon type="secondary" />}
                    text={isLoggedIn ? "Личный кабинет" : "Войти"}
                  />
                </NavItem>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default AppHeader;
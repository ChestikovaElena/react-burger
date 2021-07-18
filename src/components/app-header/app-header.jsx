import React from 'react';
import {
  Logo,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import {ICON_BURGER_ACTIVE, ICON_LIST_INACTIVE} from '../icons/icons.js';
import ElementWithIcon from '../element-with-icon';

class MenuItem extends React.Component {
  render() {
    return (
      <li className={ styles.menu_item }>
        <ElementWithIcon icon={this.props.icon} text={this.props.text} type={this.props.type}/>
      </li>
    )
  }
}

class Menu extends React.Component {
  render() {
    return (
      <nav className={ styles.menu }>
        <ul className={ styles.menu_list }>
          {this.props.children}
        </ul>
      </nav>
    );
  }
}

class AppHeader extends React.Component {
  render() {
    return (
      <div className={ styles.container }>
        <header className="header">
          <div className="pt-4 pb-4">
            <div className={ styles.header_content}>
              <Menu
                children={[
                  {icon: ICON_BURGER_ACTIVE, text: "Конструктор", type: ""},
                  {icon: ICON_LIST_INACTIVE, text: "Лента заказов", type: "text_color_inactive"}
                ]
                .map((item, index) =>
                  <MenuItem key={index} icon={item.icon} text={item.text} type={item.type}/>
                )
              }/>
              <div className={styles.elements_wrapper}>
                <Logo/>
                <ElementWithIcon
                  icon={<ProfileIcon type="secondary"/>}
                  text={"Личный кабинет"}
                  type="text_color_inactive"
                />
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default AppHeader;
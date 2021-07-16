import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

class ElementWithIcon extends React.Component {
  render() {
    return (
      <div className="pt-5 pr-5 pb-5 pl-5">
        <a href="#" className={styles.link}>
          <div className={styles.icon_wrapper}>{this.props.icon}</div>
          <span className="text text_type_main-default pl-2">{this.props.text}</span>
        </a>
      </div>
    );
  }
}

class MenuItem extends React.Component {
  render() {
    return (
      <li className={ styles.menu_item }>
        <ElementWithIcon icon={this.props.icon} text={this.props.text}/>
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
                  {icon: <BurgerIcon/>, text: "Конструктор"},
                  {icon: <ListIcon/>, text: "Лента заказов"}
                ]
                .map((item, index) => <MenuItem key={index} icon={item.icon} text={item.text}/>)
              }/>
              <div className={styles.logo_wrapper}>
                <Logo/>
              </div>
              <div className={styles.element_wrapper}>
                <ElementWithIcon icon={<ProfileIcon/>} text={"Личный кабинет"}/>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default AppHeader;
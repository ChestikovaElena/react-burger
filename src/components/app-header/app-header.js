import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Typography,
  Box
} from '@ya.praktikum/react-developer-burger-ui-components';

class MenuItem extends React.Component {
  render() {
    return (
      <li>
        <a href="#">
          {this.props.icon}
          <span>{this.props.text}</span>
        </a>
      </li>
    )
  }
}

class Menu extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          {this.props.children}
        </ul>
      </nav>
    );
  }
}

class AppHeader extends React.Component {
  render() {
    return (
      <header>
        <Menu
          children={[
            {icon: <BurgerIcon/>, text: "конструктор"},
            {icon: <ListIcon/>, text: "лента заказов"},
            {icon: <Logo />},
            {icon: <ProfileIcon/>, text: "личный кабинет"}
          ]
          .map((item, index) => <MenuItem key={index} icon={item.icon} text={item.text}/>)
        }/>
      </header>
    );
  }
}

export default AppHeader;
import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Typography,
  Box
} from '@ya.praktikum/react-developer-burger-ui-components';

class ElementWithIcon extends React.Component {
  render() {
    return (
      <a href="#">
        {this.props.icon}
        <span>{this.props.text}</span>
      </a>
    );
  }
}

class MenuItem extends React.Component {
  render() {
    return (
      <li>
        <ElementWithIcon icon={this.props.icon} text={this.props.text}/>
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
            {icon: <ListIcon/>, text: "лента заказов"}
          ]
          .map((item, index) => <MenuItem key={index} icon={item.icon} text={item.text}/>)
        }/>
        <Logo/>
        <ElementWithIcon icon={<ProfileIcon/>} text={"личный кабинет"}/>
      </header>
    );
  }
}

export default AppHeader;
import React from 'react';
import styles from './element-with-icon.module.css';

export default class ElementWithIcon extends React.Component {
  render() {
    return (
      <div className="pt-5 pr-5 pb-5 pl-5">
        <a href="#" className={styles.link}>
          <div>{this.props.icon}</div>
          <span className={`text text_type_main-default pl-2 ${this.props.type}`}>{this.props.text}</span>
        </a>
      </div>
    );
  }
}
import React, { Component } from 'react'
import styles from './Panel.css'

export default class Panel extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { updatePanels } = this.props;
    updatePanels([]);
  }

  render() {
    const { title, content, index } = this.props.data;
    return (
      <div className={styles.container}>
        <div className={styles['tab' + index]}></div>
        <div className={styles.title} onClick={this.handleClick}>{title}</div>
        <div className={styles.content}>{content}</div>
      </div>
    );
  }
}

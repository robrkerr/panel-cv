import React, { Component } from 'react'
import styles from './Panel.css'

export default class Panel extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { selectPanel, firstOpen } = this.props;
    const { key, order } = this.props.data;
    if (firstOpen && (order === 0)) {
      selectPanel(undefined);  
    } else {
      selectPanel(key);
    }
  }

  render() {
    const { title, content, key, order } = this.props.data;
    const { firstOpen } = this.props;
    const containerStyle = {
      top: order*4.6 + 'rem',
      height: ((firstOpen && (order === 0)) ? 5*4.6 : 4.6) + 'rem',
      zIndex: (order === 0) ? 1 : 0
    };
    const tabStyle = {
      width: (firstOpen ? 2 : 1) + 'rem'
    };
    const titleStyle = {
      cursor: firstOpen ? 'auto' : 'pointer'
    };
    return (
      <div className={styles.container} style={containerStyle}>
        <div className={styles['tab' + key]} style={tabStyle} onClick={this.handleClick}></div>
        <div className={styles.title} style={titleStyle} onClick={firstOpen ? undefined : this.handleClick}>{title}</div>
        <div className={styles.content}>{content}</div>
      </div>
    );
  }
}

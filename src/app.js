import React, { Component } from 'react'
import styles from './app.css'

export default class App extends Component {

  render() {
    const { tabs } = this.props.data;
    return (
      <div className={styles.main}>
        {
          tabs.map((tab,i) => (
            <div key={i}>{tab.title}</div>
          ))
        }
      </div>
    );
  }
}

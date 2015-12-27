import React, { Component } from 'react'
import Panel from './Panel'
import styles from './app.css'

export default class App extends Component {

  render() {
    const { panels, updatePanels } = this.props;
    return (
      <div className={styles.main}>
        {
          panels.map(panel => (
            <Panel key={panel.title} data={panel} updatePanels={updatePanels} />
          ))
        }
      </div>
    );
  }
}

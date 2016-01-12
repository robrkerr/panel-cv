import React, { Component } from 'react'
import ReactTransitionGroup from 'react-addons-transition-group'
import Panel from './Panel'
import styles from './app.css'

export default class App extends Component {

  render() {
    const { panels, selectPanel, heightSet, firstOpen } = this.props;
    const totalHeight = panels.reduce((sum,p) => sum + p.height, 0);
    console.log(totalHeight);
    return (
      <div className={styles.main}>
        <ReactTransitionGroup component="div">
          {
            panels.map(panel => (
              <Panel key={panel.title} totalHeight={totalHeight} firstOpen={firstOpen} data={panel} heightSet={heightSet} selectPanel={selectPanel} />
            ))
          }
        </ReactTransitionGroup>
      </div>
    );
  }
}

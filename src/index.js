import ReactDOM from 'react-dom'
import React from 'react'
import App from './app'
import fetch from './fetch'

fetch.get("/data.json").then(function(data) {
  const origPanels = data.panels.map((d,i) => ({...d, key: i, order: i}));

  function render(panels,firstOpen) {
    ReactDOM.render(
      <App panels={panels} firstOpen={firstOpen} selectPanel={selectPanel} />,
      document.getElementById('app')
    )
  }

  function selectPanel(index) {
    if (index === undefined) {
      render(origPanels,false);
    } else {
      const panels = origPanels.map((p,i) => 
        (i === index) ? {...p, order: 0} : 
        ((i < index) ? {...p, order: p.order + 1} : p)
      );
      render(panels,true);
    }
  }

  render(origPanels,false);
});

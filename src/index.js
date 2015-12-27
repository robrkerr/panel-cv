import ReactDOM from 'react-dom'
import React from 'react'
import App from './app'
import fetch from './fetch'

fetch.get("/data.json").then(function(data) {
  const panels = data.panels.map((d,i) => ({...d, index: i}));
  render(panels);
});

function render(panels) {
  ReactDOM.render(
    <App panels={panels} updatePanels={updatePanels} />,
    document.getElementById('app')
  )
}

function updatePanels(panels) {
  render(panels);
}
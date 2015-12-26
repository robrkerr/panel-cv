import ReactDOM from 'react-dom'
import React from 'react'
import App from './app'
import fetch from './fetch'

fetch.get("/data.json").then(function(data) {
  ReactDOM.render(
    <App data={data} />,
    document.getElementById('app')
  )
});

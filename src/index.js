import ReactDOM from 'react-dom'
import React from 'react'
import App from './app'
import fetch from './fetch'

ReactDOM.render(
  <App panels={[]} firstOpen={false} />,
  document.getElementById('app')
)

fetch.get("/data.json").then(data => {
  Promise.all(data.panels.map((p,i) => 
    fetch.getFile("/" + p.content).then(content => 
      ({...p, content: content || "", key: i, order: i, height: 0, top: 0})
    )
  )).then(origPanels => {

    function render(panels,firstOpen) {
      ReactDOM.render(
        <App panels={panels} firstOpen={firstOpen} selectPanel={selectPanel} heightSet={heightSet} />,
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
        updatePositions(panels, true);
        render(panels,true);
      }
    }

    function heightSet(index, titleHeight, altHeight) {
      origPanels[index].titleHeight = titleHeight;
      origPanels[index].altHeight = altHeight;
      updatePositions(origPanels, false);
      render(origPanels,false);
    }

    function updatePositions(panels, firstOpen) {
      var position = 0;
      for (var i = 0; i < panels.length; i++) {
        var panel = panels.filter(p => p.order == i)[0];
        panel.top = position;
        if ((i === 0) && firstOpen) {
          panel.height = panel.altHeight;
          position += panel.altHeight;
        } else {
          panel.height = panel.titleHeight;
          position += panel.titleHeight;
        }
      }
    }

    render(origPanels,false);
  });
});

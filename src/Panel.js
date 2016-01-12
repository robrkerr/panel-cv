import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import marked from 'marked'
import styles from './Panel.css'

function getPixelNumber(string) {
  return parseFloat(string.split('px')[0]);
}

function getHeight(computedStyle) {
  var height = 0.0;
  height += getPixelNumber(computedStyle['padding-top']);
  height += getPixelNumber(computedStyle['padding-bottom']);
  height += getPixelNumber(computedStyle.height);
  return height;
}

export default class Panel extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.rawContentMarkup = this.rawContentMarkup.bind(this);
  }

  rawContentMarkup() {
    const { content } = this.props.data;
    const rawMarkup = marked(content.toString(), {sanitize: true});
    return { __html: rawMarkup };
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

  componentWillEnter(done) {
    const { key } = this.props.data;
    const children = ReactDOM.findDOMNode(this).children;
    const title = children[2];
    const titleComputed = window.getComputedStyle(title, null);
    const alternative = children[3].children[0];
    const altComputed = window.getComputedStyle(alternative, null);
    this.props.heightSet(key, getHeight(titleComputed), getHeight(altComputed));
  } 

  render() {
    const { title, key, order, top, height } = this.props.data;
    const alternative = this.props.data.alternative || title;
    const { firstOpen, totalHeight } = this.props;
    const containerStyle = {
      top: top + 'px',
      height: ((firstOpen && (order === 0)) ? totalHeight : height) + 'px',
      zIndex: (order === 0) ? 1 : 0,
      transition: 'top 0.4s' + ((firstOpen && (order === 0)) ? ', height 0.6s' : '')
    };
    const tabStyle = {
      width: (firstOpen ? ((order === 0) ? '100%' : '2rem') : '1rem'),
      height: height + 'px'
    };
    const backingStyle = {
      cursor: firstOpen ? 'auto' : 'pointer',
      height: height + 'px'
    };
    const titleStyle = {
      pointerEvents: firstOpen ? 'auto' : 'none',
      height: firstOpen ? ('calc(' + height + 'px - 2.4rem)') : undefined
    };
    const contentStyle = {
      height: 'calc(' + (totalHeight - height) + 'px - 1.2rem)'
    };
    return (
      <div className={styles.container} style={containerStyle}>
        <div className={styles.content} style={contentStyle} dangerouslySetInnerHTML={this.rawContentMarkup()} />
        <div className={styles.titleBacking} style={backingStyle} onClick={firstOpen ? undefined : this.handleClick}></div>
        <div className={styles.title} style={titleStyle}>{title}</div>
        <div className={styles['tab' + key]} style={tabStyle} onClick={this.handleClick}>
          <div className={styles.tabInner}>{alternative}</div>
        </div>
      </div>
    );
  }
}

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
    const title = children[children.length-1];
    const computedStyle = window.getComputedStyle(title, null);
    this.props.heightSet(key, getHeight(computedStyle))
  } 

  render() {
    const { title, key, order, top, height } = this.props.data;
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
      pointerEvents: firstOpen ? 'auto' : 'none'
    }
    return (
      <div className={styles.container} style={containerStyle}>
        <div className={styles.content} dangerouslySetInnerHTML={this.rawContentMarkup()} />
        <div className={styles.titleBacking} style={backingStyle} onClick={firstOpen ? undefined : this.handleClick}></div>
        <div className={styles['tab' + key]} style={tabStyle} onClick={this.handleClick}></div>
        <div className={styles.title} style={titleStyle}>{title}</div>
      </div>
    );
  }
}

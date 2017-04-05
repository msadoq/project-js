import React, { Component, PropTypes } from 'react';
import {
  Parser,
  // ProcessNodeDefinitions,
} from 'html-to-react';

const svg = '<svg id ="mySvg" xmlns="http://www.w3.org/2000/svg"  width="2000" height="2000">'
           + '<text text-anchor="middle" font-family="serif" font-size="24"  y="100" x="400" id="svg_7" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#000000" fill="#000000">This value will change</text>'
           + '<circle id="circle" cx ="400" cy="400" fill="blue" r="40" stroke-width="2" stroke="#424242" />'
           + '<line id="l1" x1="250" y1="250" transform="rotate(45) translate(100 100)" x2="600" y2="600" stroke="green" stroke-width="2"/>'
           + '<rect  x="150" y="150"  width="50" id="r1" transform="rotate(45) translate(100 100)" height="50" stroke-width="5" stroke="#000000" fill="#FF0000" />'
           + '<rect id="svg_1" height="103" width="103" y="145" x="31" stroke-width="5" stroke="#000000" fill="#FF0000"/>'
           + '<polyline id="ply1" transform=" rotate(45) translate(100 100)  "  points="0,40 40,40 40,80 80,80 80,120 120,120 120,160" stroke="green" fill="blue" strokeWidth="5" />'
           + '</svg>';


// const processNodeDefinitions = new ProcessNodeDefinitions(React);

export default class MimicView extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  componentWillMount() {
    this.content = this.getContentComponent();
  }
  componentDidMount() {
    // this.interval = setInterval(this.testAnimParam.bind(this), 500);
  }
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  getContentComponent() {
    /*
    const processingInstructions = [
      {
        shouldProcessNode: () => false,
        processNode: node => node,
      },
    ];*/
    const comp = this.htmlToReactParser.parse(svg);
    console.log('COMP parsed: ', comp);
    return comp;
  }

  htmlToReactParser = new Parser();

  testAnimParam() {
    console.log('ok', this.test);
  }
  render() {
    return (
      <div>{this.content}</div>
    );
  }
}

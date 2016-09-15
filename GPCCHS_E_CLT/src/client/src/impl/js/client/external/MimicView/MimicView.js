import React, { Component, PropTypes } from 'react';
import convert, { generateInitialState, cleanSvg } from './Svg2React';

const svg = '<svg id ="mySvg" xmlns="http://www.w3.org/2000/svg"  width="2000" height="2000">'
           + '<text text-anchor="middle" font-family="serif" font-size="24"  y="100" x="400" id="svg_7" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#000000" fill="#000000">This value will change</text>'
           + '<circle id="circle" cx ="400" cy="400" fill="blue" r="40" stroke-width="2" stroke="#424242" />'
           + '<line id="l1" x1="250" y1="250" transform="rotate(45) translate(100 100)" x2="600" y2="600" stroke="green" stroke-width="2"/>'
           + '<rect  x="150" y="150"  width="50" id="r1" transform="rotate(45) translate(100 100)" height="50" stroke-width="5" stroke="#000000" fill="#FF0000" />'
           + '<rect id="svg_1" height="103" width="103" y="145" x="31" stroke-width="5" stroke="#000000" fill="#FF0000"/>'
           + '<polyline id="ply1" transform=" rotate(45) translate(100 100)  "  points="0,40 40,40 40,80 80,80 80,120 120,120 120,160" stroke="green" fill="blue" strokeWidth="5" />'
           + '</svg>';

export default class MimicView extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    updateContent: PropTypes.func,
  };

  constructor({ ...args }) {
    super({ ...args });
    this.state = {
      // This 2 Objects represent the actual svg State and the initial state
      transformationsInit: generateInitialState(svg),
      transformationNow: generateInitialState(svg),
      // Code is the generated code React by Svg2React module
      code: '' };
    this.interval = null; // ugly! just for testing :)
    this.renderSvg = convert(svg);
  }

  componentDidMount() {
    //this.interval = setInterval(this.testAnimParam.bind(this), 50);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

// Get an Array of the intersecting items and mouse coordiante
  clicked(evt) {
    let items = [];
    var e = evt.target;
    var x = evt.clientX;
    var y = evt.clientY;

    alert('item: ' + evt.target.id + ' x: ' + x + ' y:' + y);

    let element = document.getElementsByTagName('svg')[0];
    let rpos = element.createSVGRect();
    rpos.x = x;
    rpos.y = y;
    rpos.width = rpos.height = 10;
    var list = element.getIntersectionList(rpos, null);
    var rez = document.elementsFromPoint(x, y);


    for (var key in rez) {
    // TODO: Find a way to exclude the svg himself from the item array
      if (rez[key].id != '' && rez[key].id != 'root' /* && rez[key].id != 'svg3239'*/) {
        items.push(rez[key].id);
      }
    }
    console.log(items);
  }

// Animation functions
  animRotate(id, angleMin, angleMax, minVal, maxVal, originX, originY, val) {
    const newValAngle = ((angleMax - angleMin) / (maxVal - minVal)) * (val - minVal) + angleMin;
    this.state.transformationNow[id].transform = 'rotate(' + parseInt(newValAngle, 10) + ' ' + originX + ' ' + originY + ')';
  }

  translate(id, xMin, xMax, minVal, maxVal, val) {
    const newValx = ((xMax - xMin) / (maxVal - minVal)) * (val - minVal) + xMin;
    this.state.transformationNow[id].transform = 'translate(' + parseInt(newValx, 10) + ' 0)';
  }

  skew(id, minVal, maxVal, rotationX, rotationY, val) {
    var newValAngleX = ((rotationX) / (maxVal - minVal)) * (val - minVal);
	      var newValAngleY = ((rotationY) / (maxVal - minVal)) * (val - minVal);
    this.state.transformationNow[id].transform = 'translate(' + (parseFloat(this.state.transformationNow[id].x) + parseFloat(this.state.transformationNow[id].width) / 2) + ' ' + (parseFloat(this.state.transformationNow[id].y) + parseFloat(this.state.transformationNow[id].height) / 2) + ') skewX(' + parseInt(newValAngleX, 10) + ') translate(' + -(parseFloat(this.state.transformationNow[id].x) + parseFloat(this.state.transformationNow[id].width) / 2) + ' ' + -(parseFloat(this.state.transformationNow[id].y) + parseFloat(this.state.transformationNow[id].height) / 2) + ')';
  }
//TODO : Implement the center of the scaling as a parameter as an onClick
  animScale(id, xMin, xMax, yMin, yMax, minVal, maxVal, val) {
    const newValx = ((xMax - xMin) / (maxVal - minVal)) * (val - minVal) + xMin;
    const newValy = ((yMax - yMin) / (maxVal - minVal)) * (val - minVal) + yMin;

    this.state.transformationNow[id].transform = 'translate(' + -167.449 * (newValx - 1) + ' ,' + -50.29 * (newValy - 1) + ') scale(' + Math.abs(parseFloat(newValx, 10)) + ' ' + Math.abs(parseFloat(newValy, 10)) + ')';

    // if(this.state.transformationNow[id].transform=''){
    //   console.log('ici on est vide');
    //       this.state.transformationNow[id].transform = 'translate(' + -167.449 * (newValx - 1) + ' ,' + -50.29 * (newValy - 1) + ') scale(' + Math.abs(parseFloat(newValx, 10)) + ' ' + Math.abs(parseFloat(newValy, 10)) + ')';
    // }
    // else
    // {
    //     this.state.transformationNow[id].transform = this.state.transformationNow[id].transform + ' ' + 'translate(' + -167.449 * (newValx - 1) + ' ,' + -50.29 * (newValy - 1) + ') scale(' + Math.abs(parseFloat(newValx, 10)) + ' ' + Math.abs(parseFloat(newValy, 10)) + ')';
    // }
  }

  animColor(id, color, option, val, seuil) {
    switch (option) {
      case 'e':
        if (seuil === val) this.state.transformationNow[id].fill = color;
        else this.state.transformationNow[id].fill = this.state.transformationsInit[id].fill;
        break;
      case 'ne':
        if (seuil != val) this.state.transformationNow[id].fill = color;
        else this.state.transformationNow[id].fill = this.state.transformationsInit[id].fill;
        break;
      case 'g':
        if (seuil > val) this.state.transformationNow[id].fill = color;
        else this.state.transformationNow[id].fill = this.state.transformationsInit[id].fill;
        break;
      case 'ge':
        if (seuil >= val) this.state.transformationNow[id].fill = color;
        else this.state.transformationNow[id].fill = this.state.transformationsInit[id].fill;
        break;
      case 'l':
        if (seuil < val) this.state.transformationNow[id].fill = color;
        else this.state.transformationNow[id].fill = this.state.transformationsInit[id].fill;
        break;
      case 'le':
        if (seuil <= val) this.state.transformationNow[id].fill = color;
        else this.state.transformationNow[id].fill = this.state.transformationsInit[id].fill;
        break;
    }
  }

  animTxt(id, val) {
    this.state.transformationNow[id].txt = val;
  }
// TODO : Find a way to hide an element because visibility is not working when passing it as prop parameter but the attribute is working when we pass it manualy
  animHide(id, val, seuil) {
    // if(val < seuil)
    this.state.transformationNow.lune.visibility = 'hidden';
    // console.log(this.state.transformationNow[id].visibility);
    // else this.state.transformationNow[id].visibility = 'visible';
  }

// testAnimParam sould be called when we get new values called function to animate
  testAnimParam() {
    origin += 0.02;
    originOrbite += 0.02;
    zerocolor++;

    // console.log(zerocolor%10);
    const d = Math.cos(origin);
    const dOrbite = Math.cos(originOrbite);
    if (dOrbite > 0.9) originOrbite = Math.PI;
    this.animRotate(jsconfRotate.id, jsconfRotate.angleMin, jsconfRotate.angleMax, jsconfRotate.minVal, jsconfRotate.maxVal, jsconfRotate.cx, jsconfRotate.cy, d);

    this.animRotate(jsconfSatelite.id, jsconfSatelite.angleMin, jsconfSatelite.angleMax, jsconfSatelite.minVal, jsconfSatelite.maxVal, jsconfSatelite.cx, jsconfSatelite.cy, dOrbite % 90);
    this.animColor(jsconfColor.id, jsconfColor.color, jsconfColor.condition, d, 0);

    this.animHide('lune', 0, d);
    this.animScale(jsconfScale.id, jsconfScale.xMin, jsconfScale.xMax, jsconfScale.yMin, jsconfScale.yMax, jsconfScale.minVal, jsconfScale.maxVal, d);

    this.animTxt('textid', d);
    this.skew('skewRect', 0, 1, 40, 40, d);
    // this.translate('lune', jsconfSatelite.xMin, jsconfSatelite.xMax, jsconfSatelite.minVal, jsconfSatelite.maxVal, d);
    // this.state.transformationNow.l1.transform = 'translate(' + parseInt(x, 10) + ' 0) rotate(' + parseInt(-angle, 10) + ' 250 250 )';
    //  this.state.transformationsInit.svg_7.transform = 'rotate(' + parseInt(angle, 10) + ' 250 250 )';

    // this.animColor('lune', jsconfColor.color, jsconfColor.condition, d, 0);

    // this.animColor('textid', jsconfColor.color, jsconfColor.condition, d, 0);


    this.setState({ code: this.renderSvg[1](this.state.transformationNow, React) });
    // console.log(this.state.code);
  }

  render() {
    //return <div>visibleyyyyyyyyyyyyyyyyyyyyyyyyy</div>;
    return (<div onClick={this.clicked}>{this.state.code}</div>);
      // return (<div>{this.state.code}</div>);
  }
}

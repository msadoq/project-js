import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import LinksContainer from '../../../../windowProcess/View/LinksContainer';

const HtmlToReactParser = require('html-to-react').Parser;
const ProcessNodeDefinitions = require('html-to-react').ProcessNodeDefinitions;


const htmlToReactParser = new HtmlToReactParser();
/*
const svg = '<svg id ="mySvg" xmlns="http://www.w3.org/2000/svg"  width="2000" height="2000">'
           + '<text text-anchor="middle" font-family="serif"
           font-size="24"  y="100" x="400" id="svg_7"
           stroke-linecap="null" stroke-linejoin="null"
           stroke-dasharray="null" stroke-width="0" stroke="#000000"
           fill="#000000">This value will change</text>'
           + '<circle id="circle" cx ="400" cy="400" fill="blue"
           r="40" stroke-width="2" stroke="#424242" />'
           + '<line id="l1" x1="250" y1="250" transform="rotate(45)
           translate(100 100)" x2="600" y2="600" stroke="green" stroke-width="2"/>'
           + '<rect  x="150" y="150"  width="50" id="r1" transform="rotate(45)
           translate(100 100)" height="50" stroke-width="5" stroke="#000000" fill="#FF0000" />'
           + '<rect id="svg_1" height="103" width="103" y="145" x="31"
           stroke-width="5" stroke="#000000" fill="#FF0000"/>'
           + '<polyline id="ply1" transform=" rotate(45) translate(100 100)  "
            points="0,40 40,40 40,80 80,80 80,120 120,120 120,160" stroke="green"
            fill="blue" strokeWidth="5" />'
           + '</svg>';

const vGauge = '<svg id="vGauge" xmlns="http://www.w3.org/2000/svg" width="200" height="200">'
              + ' <path d="M50,180 Q58,190 66,180 L66,20 Q58,10 50,20 z" x2="50" y2="30" style=" fill:#EEE" />'
              + ' <path d="M50,180 Q58,190 66,180 L66,60 Q58,50 50,60 z" x2="50" y2="30" style=" fill:#A49" />'
        //      + ' <text x="52" y="120" style="stroke:#FFF">70%</text>'
              + '</svg>'; */
// const processNodeDefinitions = new ProcessNodeDefinitions(React);
const processNodeDefinitions = new ProcessNodeDefinitions(React);
const isValidNode = () => true;
// const isValueNode = /{{\s*([^}]+)\s*}}/g;


export default class MimicView extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    entryPoints: PropTypes.objectOf(PropTypes.object).isRequired,
    data: PropTypes.shape({
      values: PropTypes.object,
    }).isRequired,
    viewId: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })),
    removeLink: PropTypes.func.isRequired,
    pageId: PropTypes.string.isRequired,
    showLinks: PropTypes.bool,
    updateShowLinks: PropTypes.func.isRequired,
  };
  static defaultProps = {
    links: [],
    showLinks: false,
  };

  componentWillMount() {
    this.svgEls = [];
    this.content = this.getContentComponent();
    this.updateSvgsValues(this.props.data);
  }
  componentDidMount() {
    // this.content = this.getContentComponent();
  }
  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    if (
      nextProps.content !== this.props.content ||
      nextProps.entryPoints !== this.props.entryPoints
    ) {
      shouldRender = true;
      this.content = this.getContentComponent();
      // this.updateSvgsValues(nextProps.data);
    }
    if (nextProps.showLinks !== this.props.showLinks) {
      shouldRender = true;
    }
    if (!shouldRender) {
      this.updateSvgsValues(nextProps.data);
    }
    return shouldRender;
  }
  getContentComponent() {
    const processingInstructions = [
      {
        shouldProcessNode: (node => node.attribs && (node.attribs.animation === 'scaleY' || node.attribs.animation === 'scaleX')),
        processNode: (node, children) => {
          const epName = node.attribs.ep;
          const domain = node.attribs.domain.split(',');
          const fixed = node.attribs.fixed;
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.animation}-${epName}-${rand}`;
          this.svgEls.push({
            id,
            type: node.attribs.animation,
            epName,
            domain,
            fixed,
          });
          return (<g id={id} key={id}>{children}</g>);
        },
      },
      {
        shouldProcessNode: (node => node.attribs && (node.attribs.animation === 'translateX' || node.attribs.animation === 'translateY')),
        processNode: (node, children) => {
          const epName = node.attribs.ep;
          const domain = node.attribs.domain.split(',');
          const width = node.attribs.width;
          const direction = node.attribs.direction;
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.animation}-${epName}-${rand}`;
          this.svgEls.push({
            id,
            type: node.attribs.animation,
            epName,
            domain,
            width,
            direction,
          });
          return (<g id={id} key={id}>{children}</g>);
        },
      },
      {
        shouldProcessNode: (node => node.attribs && node.attribs.animation === 'rotate'),
        processNode: (node, children) => {
          const epName = node.attribs.ep;
          const domain = node.attribs.domain.split(',');
          const angle = node.attribs.angle;
          const center = node.attribs.center.split(',');
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.animation}-${epName}-${rand}`;
          this.svgEls.push({
            id,
            type: node.attribs.animation,
            epName,
            domain,
            angle,
            center,
          });
          return (<g id={id} key={id}>{children}</g>);
        },
      },
      {
        shouldProcessNode: (node => node.attribs && node.attribs.animation === 'textBox'),
        processNode: (node, children) => {
          const epName = node.attribs.ep;
          const font = node.attribs.font ? node.attribs.font : 'arial';
          const textColorLevels = node.attribs.textcolor ? node.attribs.textcolor.split(';') : [];
          const bgColorLevels = node.attribs.bgcolor ? node.attribs.bgcolor.split(';') : [];
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.animation}-${epName}-${rand}`;
          const size = node.attribs.size ? node.attribs.size : '12px';
          this.svgEls.push({
            id,
            type: node.attribs.animation,
            epName,
            textColorLevels,
            bgColorLevels,
            font,
          });
          return (
            <g key={id}>
              <rect id={`${id}-bg`} x={node.attribs.x} y={node.attribs.y} width={0} height={0} />
              <text
                id={id}
                x={node.attribs.x}
                y={node.attribs.y}
                style={{ fontSize: size, fontFamily: font }}
              >
                {children}
              </text>
            </g>
          );
        },
      },
      {
        shouldProcessNode: (node => node.attribs && node.attribs.animation === 'colour'),
        processNode: (node, children) => {
          const epName = node.attribs.ep;
          const operators = node.attribs.operators.split('*');
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.animation}-${epName}-${rand}`;
          this.svgEls.push({
            id,
            type: node.attribs.animation,
            epName,
            operators,
          });
          return (
            <g id={id} key={id}>
              { children }
            </g>
          );
        },
      },
      {
        shouldProcessNode: () => true,
        processNode: processNodeDefinitions.processDefaultNode,
      },
    ];
    return htmlToReactParser.parseWithInstructions(
      this.props.content,
      isValidNode,
      processingInstructions
    );
  }

  updateSvgsValues = (data) => {
    if (!data || !data.values) {
      return;
    }
    this.svgEls.forEach((g, key) => {
      if (!g.el) {
        this.svgEls[key].el = document.getElementById(g.id);
        this.svgEls[key].elBg = document.getElementById(`${g.id}-bg`);
      }
      if (g.type === 'scaleY' || g.type === 'scaleX') {
        if (!data.values[g.epName]) {
          return;
        }
        const epLastVal = data.values[g.epName].value;
        let ratio = (epLastVal - g.domain[0]) / (g.domain[1] - g.domain[0]);
        ratio = ratio < 0 ? 0 : ratio;
        const el = g.el;
        if (!el) {
          return;
        }
        if (g.type === 'scaleY') {
          el.style.transform = `scaleY(${ratio})`;
        } else {
          el.style.transform = `scaleX(${ratio})`;
        }
        el.style.transformOrigin = g.fixed || 'bottom';
      } else if (g.type === 'translateX' || g.type === 'translateY') {
        if (!data.values[g.epName]) {
          return;
        }
        const epLastVal = data.values[g.epName].value;
        let distance = ((epLastVal - g.domain[0]) / (g.domain[1] - g.domain[0])) * g.width;
        distance = distance < 0 ? 0 : distance;
        distance = distance > g.width ? g.width : distance;
        const el = g.el;
        if (!el) {
          return;
        }
        if (g.type === 'translateY') {
          if (g.direction === 'top') {
            distance *= -1;
          }
          el.style.transform = `translate(0px, ${distance}px)`;
        } else {
          if (g.direction === 'left') {
            distance *= -1;
          }
          el.style.transform = `translate(${distance}px, 0px)`;
        }
      } else if (g.type === 'rotate') {
        if (!data.values[g.epName]) {
          return;
        }
        const epLastVal = data.values[g.epName].value;
        let angle = ((epLastVal - g.domain[0]) / (g.domain[1] - g.domain[0])) * g.angle;
        angle = angle < 0 ? 0 : angle;
        angle = angle > g.angle ? g.angle : angle;
        const el = g.el;
        if (!el) {
          return;
        }
        el.style.transformOrigin = `${g.center[0]}px ${g.center[1]}px`;
        el.style.transform = `rotate(${angle}deg)`;
      } else if (g.type === 'textBox') {
        if (!data.values[g.epName]) {
          return;
        }
        const epLastVal = data.values[g.epName].value;
        const el = g.el;
        const elBg = g.elBg;
        if (el) {
          const SVGRect = el.getBBox();
          elBg.setAttribute('width', SVGRect.width);
          elBg.setAttribute('height', SVGRect.height);
          elBg.setAttribute('y', SVGRect.y);
          el.innerHTML = isNaN(epLastVal) ? epLastVal : Math.round(epLastVal * 100) / 100;
          let fillText = '#000';
          let fillBg = '#FFF';
          for (let i = 0; i < g.textColorLevels.length; i += 1) {
            const stateColor = g.textColorLevels[i].split('$');
            if (epLastVal > stateColor[0]) {
              fillText = stateColor[1];
            }
          }
          el.style.fill = fillText;
          for (let i = 0; i < g.bgColorLevels.length; i += 1) {
            const stateColor = g.bgColorLevels[i].split('$');
            if (epLastVal > stateColor[0]) {
              fillBg = stateColor[1];
            }
          }
          elBg.style.fill = fillBg;
        }
      } else if (g.type === 'colour') {
        if (!data.values[g.epName]) {
          return;
        }
        const epLastVal = data.values[g.epName].value;
        const el = g.el;
        if (!el) {
          return;
        }
        let color;
        for (let i = 0; i < g.operators.length; i += 1) {
          const stateColor = g.operators[i].split('$');
          if (stateColor[0] === '=' && epLastVal === stateColor[1]) {
            color = stateColor[2];
          } else if (stateColor[0] === '!=' && epLastVal !== stateColor[1]) {
            color = stateColor[2];
          } else if (stateColor[0] === '>' && epLastVal > stateColor[1]) {
            color = stateColor[2];
          } else if (stateColor[0] === '>=' && epLastVal >= stateColor[1]) {
            color = stateColor[2];
          } else if (stateColor[0] === '<' && epLastVal < stateColor[1]) {
            color = stateColor[2];
          } else if (stateColor[0] === '<=' && epLastVal <= stateColor[1]) {
            color = stateColor[2];
          }
        }
        const nodes = el.childNodes;
        if (color) {
          for (let i = 0; i < nodes.length; i += 1) {
            if (nodes[i].style) {
              nodes[i].style.fill = color;
            }
          }
        }
      }
    });
  }

  svgEls = [];

  toggleShowLinks = (e) => {
    e.preventDefault();
    const { showLinks, updateShowLinks, viewId } = this.props;
    updateShowLinks(viewId, !showLinks);
  }
  removeLink = (e, index) => {
    e.preventDefault();
    const { removeLink, viewId } = this.props;
    removeLink(viewId, index);
  }

  render() {
    const { links, pageId, showLinks } = this.props;
    const style = { padding: '15px' };

    return (
      <div className="h100 posRelative">
        <Row className="h100 posRelative">
          <Col xs={12} style={style}>
            <LinksContainer
              show={showLinks}
              toggleShowLinks={this.toggleShowLinks}
              links={links}
              removeLink={this.removeLink}
              pageId={pageId}
            />
          </Col>
          <Col xs={12} className="h100 posRelative">
            <svg width="100%" height="100%" >{this.content}</svg>
          </Col>
        </Row>
      </div>
    );
  }
}

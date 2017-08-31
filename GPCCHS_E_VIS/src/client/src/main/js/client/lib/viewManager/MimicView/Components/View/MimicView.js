import React, { Component, PropTypes } from 'react';
import {
  scaleAnimation,
  translateAnimation,
  rotateAnimation,
  textBoxAnimation,
  colourAnimation,
  showAnimation,
} from './animations';

const HtmlToReactParser = require('html-to-react').Parser;
const ProcessNodeDefinitions = require('html-to-react').ProcessNodeDefinitions;

const htmlToReactParser = new HtmlToReactParser();
const processNodeDefinitions = new ProcessNodeDefinitions(React);
const isValidNode = () => true;
// const isValueNode = /{{\s*([^}]+)\s*}}/g;

const validOrigin = values =>
  ['center', 'right', 'left'].includes(values[0])
    && ['center', 'top', 'bottom'].includes(values[1]);

export default class MimicView extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    entryPoints: PropTypes.objectOf(PropTypes.object).isRequired,
    data: PropTypes.shape({
      values: PropTypes.object,
    }).isRequired,
    perfOutput: PropTypes.bool,
  }

  static defaultProps = {
    data: {
      values: {},
    },
    entryPoints: {},
    inspectorEpId: null,
    links: [],
    showLinks: false,
    perfOutput: false,
  };

  componentWillMount() {
    this.svgEls = [];
    this.content = this.getContentComponent();
  }
  componentDidMount() {
    this.updateSvgsValues(this.props.data);
  }
  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    if (
      nextProps.content !== this.props.content ||
      nextProps.entryPoints !== this.props.entryPoints
    ) {
      shouldRender = true;
      this.content = this.getContentComponent(nextProps);
      // this.updateSvgsValues(nextProps.data);
    }
    if (!shouldRender) {
      this.updateSvgsValues(nextProps.data);
    }
    return shouldRender;
  }

  componentWillUpdate(nextProps) {
    this.svgEls = [];
    this.content = this.getContentComponent(nextProps);
  }

  componentDidUpdate() {
    // console.log('micmic did upadate');
    this.updateSvgsValues(this.props.data);
  }
  getContentComponent(props = this.props) {
    const processingInstructions = [
      {
        shouldProcessNode: (node => node.attribs && (node.attribs.isis_animation === 'scaleY' || node.attribs.isis_animation === 'scaleX')),
        processNode: (node, children) => {
          const epName = node.attribs.isis_ep;
          const domain = node.attribs.isis_domain
            .split(',')
            .map(a => parseFloat(a));
          let origin = node.attribs.isis_origin;
          if (!origin || !validOrigin(origin.split(','))) {
            origin = null;
          } else {
            origin = origin.replace(',', ' ');
          }
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.isis_animation}-${epName}-${rand}`;
          this.svgEls.push({
            id,
            type: node.attribs.isis_animation,
            defaultValue: parseFloat(node.attribs.isis_default),
            epName,
            domain,
            origin,
          });
          return React.createElement(
            node.name,
            { style: node.attribs.style, id, key: id },
            children
          );
        },
      },
      {
        shouldProcessNode: (node => node.attribs && (node.attribs.isis_animation === 'translateX' || node.attribs.isis_animation === 'translateY')),
        processNode: (node, children) => {
          const epName = node.attribs.isis_ep;
          const domain = node.attribs.isis_domain
            .split(',')
            .map(a => parseFloat(a));
          const width = parseFloat(node.attribs.isis_width);
          const direction = node.attribs.isis_direction;
          let origin = node.attribs.isis_origin;
          if (!origin || !validOrigin(origin.split(','))) {
            origin = null;
          } else {
            origin = origin.replace(',', ' ');
          }
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.isis_animation}-${epName}-${rand}`;
          this.svgEls.push({
            id,
            type: node.attribs.isis_animation,
            defaultValue: parseFloat(node.attribs.isis_default),
            epName,
            domain,
            width,
            direction,
            origin,
          });
          return React.createElement(
            node.name,
            { style: node.attribs.style, id, key: id },
            children
          );
        },
      },
      {
        shouldProcessNode: (node => node.attribs && node.attribs.isis_animation === 'rotate'),
        processNode: (node, children) => {
          const epName = node.attribs.isis_ep;
          const domain = node.attribs.isis_domain
            .split(',')
            .map(a => parseFloat(a));
          const angle = node.attribs.isis_angle
            .split(',')
            .map(a => parseFloat(a));
          let origin = node.attribs.isis_origin;
          if (!origin || !validOrigin(origin.split(','))) {
            console.log('NOT VALID', origin);
            origin = null;
          } else {
            origin = origin.replace(',', ' ');
          }
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.isis_animation}-${epName}-${rand}`;
          this.svgEls.push({
            id,
            type: node.attribs.isis_animation,
            defaultValue: parseFloat(node.attribs.isis_default),
            epName,
            domain,
            angle,
            origin,
          });
          return React.createElement(
            node.name,
            { style: node.attribs.style, id, key: id },
            children
          );
        },
      },
      {
        shouldProcessNode: (node => node.attribs && node.attribs.isis_animation === 'textBox'),
        processNode: (node, children) => {
          const epName = node.attribs.isis_ep;
          const font = node.attribs.isis_font ? node.attribs.isis_font : 'arial';
          const textColorThresholds = node.attribs.isis_textcolor_thresholds ? node.attribs.isis_textcolor_thresholds.split(';') : [];
          const textColorRegex = node.attribs.isis_textcolor_regex ? node.attribs.isis_textcolor_regex.split('|') : [];
          const bgColorLevels = node.attribs.isis_bgcolor ? node.attribs.isis_bgcolor.split(';') : [];
          const defaultValue = node.attribs.isis_default ? node.attribs.isis_default.split(';') : null;
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.isis_animation}-${epName}-${rand}`;
          const size = node.attribs.isis_size ? node.attribs.isis_size : '12px';
          this.svgEls.push({
            id,
            type: node.attribs.isis_animation,
            defaultValue,
            epName,
            textColorThresholds,
            textColorRegex,
            bgColorLevels,
            font,
          });
          return (
            <g key={id}>
              <rect id={`${id}-bg`} x={node.attribs.isis_x} y={node.attribs.isis_y} width={0} height={0} />
              <text
                id={id}
                x={node.attribs.isis_x}
                y={node.attribs.isis_y}
                style={{ fontSize: size, fontFamily: font }}
              >
                {children}
              </text>
            </g>
          );
        },
      },
      {
        shouldProcessNode: (node => node.attribs && node.attribs.isis_animation === 'colour'),
        processNode: (node, children) => {
          const epName = node.attribs.isis_ep;
          const operators = node.attribs.isis_operators.split('*');
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.isis_animation}-${epName}-${rand}`;
          this.svgEls.push({
            id,
            type: node.attribs.isis_animation,
            defaultValue: node.attribs.isis_default,
            epName,
            operators,
          });
          return React.createElement(
            node.name,
            { style: node.attribs.style, id, key: id },
            children
          );
        },
      },
      {
        shouldProcessNode: (node => node.attribs && node.attribs.isis_animation === 'show'),
        processNode: (node, children) => {
          const epName = node.attribs.isis_ep;
          const displayThresholds = node.attribs.isis_thresholds ? node.attribs.isis_thresholds.split(';') : [];
          const displayRegex = node.attribs.isis_regex ? node.attribs.isis_regex.split('|') : [];
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.isis_animation}-${epName}-${rand}`;
          this.svgEls.push({
            id,
            type: node.attribs.isis_animation,
            epName,
            displayThresholds,
            displayRegex,
          });
          return React.createElement(
            node.name,
            { style: node.attribs.style, id, key: id },
            children
          );
        },
      },
      {
        shouldProcessNode: () => true,
        processNode: processNodeDefinitions.processDefaultNode,
      },
    ];
    return htmlToReactParser.parseWithInstructions(
      props.content,
      isValidNode,
      processingInstructions
    );
  }

  updateSvgsValues = (data) => {
    if (!data || !data.values) {
      return;
    }
    const { perfOutput } = this.props;
    if (perfOutput) {
      // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
      console.time();
    }
    this.svgEls.forEach((g, key) => {
      if (!g.el) {
        this.svgEls[key].el = document.getElementById(g.id);
        this.svgEls[key].elBg = document.getElementById(`${g.id}-bg`);
      }
      if (g.type === 'scaleY' || g.type === 'scaleX') {
        scaleAnimation(data, g);
      } else if (g.type === 'translateX' || g.type === 'translateY') {
        translateAnimation(data, g);
      } else if (g.type === 'rotate') {
        rotateAnimation(data, g);
      } else if (g.type === 'textBox') {
        textBoxAnimation(data, g);
      } else if (g.type === 'colour') {
        colourAnimation(data, g);
      } else if (g.type === 'show') {
        showAnimation(data, g);
      }
    });
    if (perfOutput) {
      // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
      console.log(
        'Looped on',
        this.svgEls.length,
        'eps'
      );
      // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
      console.timeEnd();
    }
  }

  svgEls = [];

  render() {
    return (
      <svg width="100%" height="100%">{this.content}</svg>
    );
  }
}

// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #6129 : 03/05/2017 : first functionnal mimic with animations
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6129 : 09/05/2017 : check and improve mimic perfs
// VERSION : 1.1.2 : DM : #6129 : 12/05/2017 : Merge dev branch & gauge done
// VERSION : 1.1.2 : DM : #6129 : 16/05/2017 : add rotate animation and knobe component in mimic
// VERSION : 1.1.2 : DM : #6129 : 18/05/2017 : display strings animates values in mimic
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add possibility to show links in views
// VERSION : 1.1.2 : DM : #6129 : 31/05/2017 : add digital display feature and fix lint warnings
// VERSION : 1.1.2 : DM : #6785 : 06/06/2017 : Fix links in mimic view
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files. Possibility to add it in editor using context menu
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : Merge dev in abesson-mimic .
// VERSION : 1.1.2 : DM : #6129 : 20/06/2017 : Fix bug in mimic render
// VERSION : 1.1.2 : DM : #5822 : 21/06/2017 : add context menu in mimiv view to open entry points in inspector
// VERSION : 1.1.2 : DM : #6129 : 27/06/2017 : Add show / hide animation .
// VERSION : 1.1.2 : DM : #6129 : 27/06/2017 : prepare mimic for demo scenario
// VERSION : 1.1.2 : DM : #6129 : 27/06/2017 : merge dev on abesson-mimic branch .
// VERSION : 1.1.2 : DM : #6700 : 28/06/2017 : Remove forgotten console.log in MimicView
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to limit visuWindow per view
// VERSION : 1.1.2 : FA : #7185 : 06/07/2017 : Fix lint errors and warnings
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 20/07/2017 : Reimplement openLink middleware . .
// VERSION : 1.1.2 : DM : #6785 : 21/07/2017 : Fix lint warning in MimicView
// VERSION : 1.1.2 : DM : #6785 : 21/07/2017 : add links on mimicView if specify in svg editor
// VERSION : 1.1.2 : DM : #6816 : 02/08/2017 : add mimic benchmark with isolated mimicView component
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : DM : #6816 : 25/08/2017 : Put MimicView animation methods appart, and test each one of them (rotate, scale...).
// VERSION : 1.1.2 : DM : #6816 : 30/08/2017 : Added default values to all MimicView's animations.
// VERSION : 1.1.2 : DM : #6816 : 30/08/2017 : imicView Fixed rotate animation error, set visibility to visible.
// VERSION : 1.1.2 : DM : #6816 : 30/08/2017 : MimicView : style attribute is the only attribute kept from svg nodes.
// VERSION : 1.1.2 : DM : #6816 : 30/08/2017 : nodes processed by MimicView are not systematically transformed into <g>, node.name are preserved (except for textBox animation).
// VERSION : 1.1.2 : DM : #6816 : 31/08/2017 : MimicView : rotate property can go under 0, ex: -25,25. For rotate, translate and scale, isis_origin must be provided or is set to left top.
// VERSION : 1.1.2 : DM : #6816 : 01/09/2017 : MimicView : renamed some attributes, no origin attribute for translate animation, scale can go between x and x angles.
// VERSION : 1.1.2 : DM : #6816 : 06/09/2017 : Test perfs on mimic, add new demo mimic
// VERSION : 1.1.2 : DM : #6816 : 07/09/2017 : add plotviews with differents EP
// VERSION : 1.1.2 : DM : #6816 : 13/09/2017 : Its possible to change the size of the mimic in the view ezeditor
// END-HISTORY
// ====================================================================

import React, { Component, PropTypes } from 'react';
import {
  scaleAnimation,
  translateAnimation,
  rotateAnimation,
  textBoxAnimation,
  colourAnimation,
  showAnimation,
  skewAnimation,
} from './animations';

const HtmlToReactParser = require('html-to-react').Parser;
const ProcessNodeDefinitions = require('html-to-react').ProcessNodeDefinitions;

const htmlToReactParser = new HtmlToReactParser();
const processNodeDefinitions = new ProcessNodeDefinitions(React);
const isValidNode = () => true;

const validOrigin = values =>
  ['center', 'right', 'left'].includes(values[0]) &&
  ['center', 'top', 'bottom'].includes(values[1]);

const { shape, string, number, object, objectOf, bool } = PropTypes;

export default class MimicView extends Component {
  static propTypes = {
    content: string.isRequired,
    entryPoints: objectOf(object).isRequired,
    data: shape({
      values: object,
    }).isRequired,
    perfOutput: bool,
    width: number.isRequired,
    height: number.isRequired,
  };
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
          const scale = node.attribs.isis_scale ?
              node.attribs.isis_scale
                .split(',')
                .map(a => parseFloat(a))
            :
              [0, 100];
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
            scale,
          });
          const validAttributes = {};
          Object.keys(node.attribs).forEach((attr) => {
            if (!attr.startsWith('isis_') && attr !== 'style') {
              validAttributes[attr] = node.attribs[attr];
            }
          });
          return React.createElement(
            node.name,
            { ...validAttributes, id, key: id },
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
          const distance = parseFloat(node.attribs.isis_distance);
          const direction = node.attribs.isis_direction;
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.isis_animation}-${epName}-${rand}`;
          this.svgEls.push({
            id,
            type: node.attribs.isis_animation,
            defaultValue: parseFloat(node.attribs.isis_default),
            epName,
            domain,
            distance,
            direction,
          });
          const validAttributes = {};
          Object.keys(node.attribs).forEach((attr) => {
            if (!attr.startsWith('isis_') && attr !== 'style') {
              validAttributes[attr] = node.attribs[attr];
            }
          });
          return React.createElement(
            node.name,
            { ...validAttributes, id, key: id },
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
          const validAttributes = {};
          Object.keys(node.attribs).forEach((attr) => {
            if (!attr.startsWith('isis_') && attr !== 'style') {
              validAttributes[attr] = node.attribs[attr];
            }
          });
          return React.createElement(
            node.name,
            { ...validAttributes, id, key: id },
            children
          );
        },
      },
      {
        shouldProcessNode: (node => node.attribs && (node.attribs.isis_animation === 'skewY' || node.attribs.isis_animation === 'skewX')),
        processNode: (node, children) => {
          const epName = node.attribs.isis_ep;
          const domain = node.attribs.isis_domain
            .split(',')
            .map(a => parseFloat(a));
          const angle = node.attribs.isis_angle
            .split(',')
            .map(a => parseFloat(a));
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.isis_animation}-${epName}-${rand}`;
          this.svgEls.push({
            id,
            type: node.attribs.isis_animation,
            defaultValue: parseFloat(node.attribs.isis_default),
            epName,
            domain,
            angle,
          });
          const validAttributes = {};
          Object.keys(node.attribs).forEach((attr) => {
            if (!attr.startsWith('isis_') && attr !== 'style') {
              validAttributes[attr] = node.attribs[attr];
            }
          });
          return React.createElement(
            node.name,
            { ...validAttributes, id, key: id },
            children
          );
        },
      },
      {
        shouldProcessNode: (node => node.attribs && node.attribs.isis_animation === 'textBox'),
        processNode: (node, children) => {
          const epName = node.attribs.isis_ep;
          const font = node.attribs.isis_font ? node.attribs.isis_font : 'arial';
          const textColorOperators = node.attribs.isis_textcolor_operators ? node.attribs.isis_textcolor_operators.split(';;') : [];
          const textColorRegex = node.attribs.isis_textcolor_regex ? node.attribs.isis_textcolor_regex.split(';;') : [];
          const bgColorOperators = node.attribs.isis_bgcolor_operators ? node.attribs.isis_bgcolor_operators.split(';;') : [];
          const bgColorRegex = node.attribs.isis_bgcolor_regex ? node.attribs.isis_bgcolor_regex.split(';;') : [];
          const defaultValue = node.attribs.isis_default ? node.attribs.isis_default.split(';') : null;
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.isis_animation}-${epName}-${rand}`;
          const size = node.attribs.isis_size ? node.attribs.isis_size : '12px';
          this.svgEls.push({
            id,
            type: node.attribs.isis_animation,
            defaultValue,
            epName,
            textColorOperators,
            textColorRegex,
            bgColorOperators,
            bgColorRegex,
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
          const colorOperators = node.attribs.isis_color_operators ? node.attribs.isis_color_operators.split(';;') : [];
          const colorRegex = node.attribs.isis_color_regex ? node.attribs.isis_color_regex.split(';;') : [];
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.isis_animation}-${epName}-${rand}`;
          this.svgEls.push({
            id,
            type: node.attribs.isis_animation,
            defaultValue: node.attribs.isis_default,
            epName,
            colorOperators,
            colorRegex,
          });
          const validAttributes = {};
          Object.keys(node.attribs).forEach((attr) => {
            if (!attr.startsWith('isis_') && attr !== 'style') {
              validAttributes[attr] = node.attribs[attr];
            }
          });
          return React.createElement(
            node.name,
            { ...validAttributes, id, key: id },
            children
          );
        },
      },
      {
        shouldProcessNode: (node => node.attribs && node.attribs.isis_animation === 'show'),
        processNode: (node, children) => {
          const epName = node.attribs.isis_ep;
          const displayOperators = node.attribs.isis_operators ? node.attribs.isis_operators.split(';;') : [];
          const displayRegex = node.attribs.isis_regex ? node.attribs.isis_regex.split(';;') : [];
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.isis_animation}-${epName}-${rand}`;
          this.svgEls.push({
            id,
            type: node.attribs.isis_animation,
            epName,
            displayOperators,
            displayRegex,
          });
          const validAttributes = {};
          Object.keys(node.attribs).forEach((attr) => {
            if (!attr.startsWith('isis_') && attr !== 'style') {
              validAttributes[attr] = node.attribs[attr];
            }
          });
          return React.createElement(
            node.name,
            { ...validAttributes, id, key: id },
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
      } else if (g.type === 'skewX' || g.type === 'skewY') {
        skewAnimation(data, g);
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
  };
  svgEls = [];
  render() {
    return (
      <svg width={`${this.props.width}px`} height={`${this.props.height}px`}>{this.content}</svg>
    );
  }
}

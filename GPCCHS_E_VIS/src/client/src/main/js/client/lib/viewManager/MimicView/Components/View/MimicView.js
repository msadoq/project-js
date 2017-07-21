import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import _each from 'lodash/each';
import LinksContainer from '../../../../windowProcess/View/LinksContainer';
import handleContextMenu from '../../../../windowProcess/common/handleContextMenu';
import getLogger from '../../../../common/logManager';
import styles from './MimicView.css';

const HtmlToReactParser = require('html-to-react').Parser;
const ProcessNodeDefinitions = require('html-to-react').ProcessNodeDefinitions;

const htmlToReactParser = new HtmlToReactParser();
const processNodeDefinitions = new ProcessNodeDefinitions(React);
const isValidNode = () => true;
// const isValueNode = /{{\s*([^}]+)\s*}}/g;
const logger = getLogger('view:mimic');

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
    mainMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
    isViewsEditorOpen: PropTypes.bool.isRequired,
    isInspectorOpened: PropTypes.bool.isRequired,
    inspectorEpId: PropTypes.string,
    openInspector: PropTypes.func.isRequired,
    openEditor: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    isMaxVisuDurationExceeded: PropTypes.bool.isRequired,
    openLink: PropTypes.func.isRequired,
  };
  static defaultProps = {
    links: [],
    showLinks: false,
    inspectorEpId: null,
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
      this.content = this.getContentComponent(nextProps);
      // this.updateSvgsValues(nextProps.data);
    }
    if (nextProps.showLinks !== this.props.showLinks) {
      shouldRender = true;
    }
    if (nextProps.isMaxVisuDurationExceeded !== this.props.isMaxVisuDurationExceeded) {
      shouldRender = true;
      if (!nextProps.isMaxVisuDurationExceeded) {
        this.content = this.getContentComponent(nextProps);
        this.updateSvgsValues(nextProps.data);
      }
    }
    if (!shouldRender) {
      this.updateSvgsValues(nextProps.data);
    }

    return shouldRender;
  }

  onContextMenu = (event) => {
    event.stopPropagation();
    const {
      entryPoints,
      openInspector,
      isViewsEditorOpen,
      openEditor,
      closeEditor,
      mainMenu,
      isInspectorOpened,
      inspectorEpId,
    } = this.props;
    const separator = { type: 'separator' };
    const editorMenu = (isViewsEditorOpen) ?
    {
      label: 'Close Editor',
      click: () => closeEditor(),
    } : {
      label: 'Open Editor',
      click: () => {
        openEditor();
      },
    };
    const inspectorMenu = {
      label: 'Open in Inspector',
      submenu: [],
    };
    _each(entryPoints, (ep, epName) => {
      const label = `${epName}`;
      if (ep.error) {
        inspectorMenu.submenu.push({ label, enabled: false });
        return;
      }
      const { id, dataId, field } = ep;
      const opened = isInspectorOpened && (inspectorEpId === id);
      inspectorMenu.submenu.push({
        label,
        type: 'checkbox',
        click: () => openInspector({
          epId: id,
          dataId,
          epName,
          field,
        }),
        checked: opened,
      });
    });
    handleContextMenu([inspectorMenu, editorMenu, separator, ...mainMenu]);
  };

  getContentComponent(props = this.props) {
    const processingInstructions = [
      {
        shouldProcessNode: (node => node.attribs && (node.attribs.isis_animation === 'scaleY' || node.attribs.isis_animation === 'scaleX')),
        processNode: (node, children) => {
          const epName = node.attribs.isis_ep;
          const domain = node.attribs.isis_domain.split(',');
          const fixed = node.attribs.isis_fixed;
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.isis_animation}-${epName}-${rand}`;
          this.svgEls.push({
            id,
            type: node.attribs.isis_animation,
            epName,
            domain,
            fixed,
          });
          return (<g id={id} key={id}>{children}</g>);
        },
      },
      {
        shouldProcessNode: (node => node.attribs && (node.attribs.isis_animation === 'translateX' || node.attribs.isis_animation === 'translateY')),
        processNode: (node, children) => {
          const epName = node.attribs.isis_ep;
          const domain = node.attribs.isis_domain.split(',');
          const width = node.attribs.isis_width;
          const direction = node.attribs.isis_direction;
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.isis_animation}-${epName}-${rand}`;
          this.svgEls.push({
            id,
            type: node.attribs.isis_animation,
            epName,
            domain,
            width,
            direction,
          });
          return (<g id={id} key={id}>{children}</g>);
        },
      },
      {
        shouldProcessNode: (node => node.attribs && node.attribs.isis_animation === 'rotate'),
        processNode: (node, children) => {
          const epName = node.attribs.isis_ep;
          const domain = node.attribs.isis_domain.split(',');
          const angle = node.attribs.isis_angle;
          const center = node.attribs.isis_center.split(',');
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.isis_animation}-${epName}-${rand}`;
          this.svgEls.push({
            id,
            type: node.attribs.isis_animation,
            epName,
            domain,
            angle,
            center,
          });
          return (<g id={id} key={id}>{children}</g>);
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
          const rand = Math.round(Math.random() * 100000);
          const id = `${node.attribs.isis_animation}-${epName}-${rand}`;
          const size = node.attribs.isis_size ? node.attribs.isis_size : '12px';
          this.svgEls.push({
            id,
            type: node.attribs.isis_animation,
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
      props.content,
      isValidNode,
      processingInstructions
    );
  }

  scaleAnimation = (data, g) => {
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
  }

  translateAnimation = (data, g) => {
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
  }

  rotateAnimation = (data, g) => {
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
  }

  textBoxAnimation = (data, g) => {
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
      let fillBg = '';
      for (let i = 0; i < g.textColorThresholds.length; i += 1) {
        const stateColor = g.textColorThresholds[i].split('|');
        if (epLastVal > stateColor[0]) {
          fillText = stateColor[1];
        }
      }
      for (let i = 0; i < g.textColorRegex.length; i += 1) {
        const stateColor = g.textColorRegex[i].split('=');
        const regex = RegExp(stateColor[0]);
        if (epLastVal.match(regex)) {
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
      elBg.style.fillOpacity = fillBg === '' ? 0 : 1;
    }
  }

  colourAnimation = (data, g) => {
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

  showAnimation = (data, g) => {
    if (!data.values[g.epName]) {
      return;
    }
    const el = g.el;
    const epLastVal = data.values[g.epName].value;
    if (el) {
      let visibility = 'hidden';
      for (let i = 0; i < g.displayThresholds.length; i += 1) {
        const stateColor = g.displayThresholds[i].split('$');
        if (stateColor[0] === '=' && epLastVal === stateColor[1]) {
          visibility = stateColor[2];
        } else if (stateColor[0] === '!=' && epLastVal !== stateColor[1]) {
          visibility = stateColor[2];
        } else if (stateColor[0] === '>' && epLastVal > stateColor[1]) {
          visibility = stateColor[2];
        } else if (stateColor[0] === '>=' && epLastVal >= stateColor[1]) {
          visibility = stateColor[2];
        } else if (stateColor[0] === '<' && epLastVal < stateColor[1]) {
          visibility = stateColor[2];
        } else if (stateColor[0] === '<=' && epLastVal <= stateColor[1]) {
          visibility = stateColor[2];
        }
      }
      for (let i = 0; i < g.displayRegex.length; i += 1) {
        const stateColor = g.displayRegex[i].split('=');
        const regex = RegExp(stateColor[0]);
        if (epLastVal.match(regex)) {
          visibility = stateColor[1];
        }
      }
      el.style.visibility = visibility === 'show' ? 'visible' : 'hidden';
    }
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
        this.scaleAnimation(data, g);
      } else if (g.type === 'translateX' || g.type === 'translateY') {
        this.translateAnimation(data, g);
      } else if (g.type === 'rotate') {
        this.rotateAnimation(data, g);
      } else if (g.type === 'textBox') {
        this.textBoxAnimation(data, g);
      } else if (g.type === 'colour') {
        this.colourAnimation(data, g);
      } else if (g.type === 'show') {
        this.showAnimation(data, g);
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

  handleClicked = (e) => {
    if (e.target.getAttribute('data-isis-link')) {
      this.props.openLink(e.target.getAttribute('data-isis-link'));
    }
  }

  render() {
    const { links, viewId, pageId, showLinks, isMaxVisuDurationExceeded } = this.props;
    const style = { padding: '15px' };

    if (isMaxVisuDurationExceeded) {
      const noRenderMsg = 'Visu Window is too long for this type of view';
      logger.debug('no render due to', noRenderMsg);
      return (
        <div className="flex">
          <div className={styles.renderErrorText}>
            Unable to render view <br />
            {noRenderMsg}
          </div>
        </div>
      );
    }
    return (
      <div className="h100 posRelative" onContextMenu={this.onContextMenu}>
        <Row className="h100 posRelative">
          <Col xs={12} style={style}>
            <LinksContainer
              show={showLinks}
              toggleShowLinks={this.toggleShowLinks}
              links={links}
              removeLink={this.removeLink}
              pageId={pageId}
              viewId={viewId}
            />
          </Col>
          <Col xs={12} className="h100 posRelative" onClick={e => this.handleClicked(e)}>
            <svg width="100%" height="100%">{this.content}</svg>
          </Col>
        </Row>
      </div>
    );
  }
}

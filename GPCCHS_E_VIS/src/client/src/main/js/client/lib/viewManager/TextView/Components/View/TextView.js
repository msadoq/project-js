import React, { PureComponent, PropTypes } from 'react';
import {
  Parser,
  ProcessNodeDefinitions,
} from 'html-to-react';
import _ from 'lodash/fp';
import _get from 'lodash/get';
import _each from 'lodash/each';
import getLogger from 'common/log';
import { html as beautifyHtml } from 'js-beautify';
import { get } from 'common/parameters';

import DroppableContainer from '../../../../windowProcess/common/DroppableContainer';
import handleContextMenu from '../../../../windowProcess/common/handleContextMenu';

const logger = getLogger('view:text');

const getComObject =
  _.propOr('UNKNOWN_COM_OBJECT', 0);

// parse clipboard data to create partial entry point
function parseDragData(data) {
  return {
    name: data.item,
    connectedData: {
      formula: `${data.catalogName}.${data.item}<${getComObject(data.comObjects)}>.${get('DEFAULT_FIELD')[getComObject(data.comObjects)]}`,
    },
  };
}

const isValueNode = /{{\s*([^}]+)\s*}}/g;

const getTextStyle = color => ({
  textShadow: `
    0 0 5px rgba(255, 255, 255, 0.1),
    0 0 10px rgba(255, 255, 255, 0.1),
    0 0 20px ${color},
    0 0 30px ${color},
    0 0 40px ${color},
    0 0 55px ${color},
    0 0 75px ${color}
  `,
  color,
});

const memoizedGetTextStyles = (() => {
  const styles = [];
  return (color) => {
    if (!styles[color]) {
      styles[color] = getTextStyle(color);
    }
    return styles[color];
  };
})();

const getEpSpan = (target) => {
  const spans = target.querySelectorAll('.ep');
  if (spans.length === 1) {
    return spans[0];
  }
  if (spans.length > 1) {
    return null;
  }
  const parent = target.parentNode;
  if (!parent) {
    return null;
  }
  return getEpSpan(parent);
};

export default class TextView extends PureComponent {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    addEntryPoint: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    updateContent: PropTypes.func.isRequired,
    entryPoints: PropTypes.objectOf(PropTypes.object),
    pageId: PropTypes.string.isRequired,
    openInspector: PropTypes.func.isRequired,
  };
  static defaultProps = {
    data: {
      values: {},
    },
    entryPoints: {},
  };

  componentWillMount() {
    this.template = { html: beautifyHtml(this.props.content, { indent_size: 2 }) };
    this.content = this.getContentComponent();
  }

  componentDidMount() {
    this.updateSpanValues();
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    if (
      nextProps.content !== this.props.content ||
      nextProps.entryPoints !== this.props.entryPoints
    ) {
      shouldRender = true;
      this.template = { html: beautifyHtml(nextProps.content, { indent_size: 2 }) };
      this.content = this.getContentComponent();
    }
    ['isViewsEditorOpen', 'show', 'addEntryPoint', 'addEntryPoint'].forEach((attr) => {
      if (nextProps[attr] !== this.props[attr]) {
        shouldRender = true;
      }
    });
    if (!shouldRender) {
      this.updateSpanValues(nextProps);
    }
    return shouldRender;
  }


  onContextMenu = (event) => {
    const { entryPoints, openInspector, pageId } = this.props;
    const span = getEpSpan(event.target);
    if (span) {
      const epName = _get(this.spanValues, [span.id, 'ep']);
      const label = `Open ${epName} in Inspector`;
      if (_get(entryPoints, [epName, 'error'])) {
        handleContextMenu({ label, enabled: false });
        return;
      }
      const { remoteId, dataId } = entryPoints[epName];
      const simpleMenu = {
        label,
        click: () => openInspector({
          pageId,
          remoteId,
          dataId,
        }),
      };
      handleContextMenu(simpleMenu);
      return;
    }
    const complexMenu = {
      label: 'Open parameter in Inspector',
      submenu: [],
    };
    _each(entryPoints, (ep, epName) => {
      const label = `${epName}`;
      if (ep.error) {
        complexMenu.submenu.push({ label, enabled: false });
        return;
      }
      const { remoteId, dataId } = ep;
      complexMenu.submenu.push({
        label,
        click: () => openInspector({
          pageId,
          remoteId,
          dataId,
        }),
      });
    });
    handleContextMenu(complexMenu);
  }

  onDrop = (e) => {
    const data = e.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);

    if (!_get(content, 'catalogName')) {
      return;
    }

    this.props.addEntryPoint(
      this.props.viewId,
      parseDragData(content)
    );

    e.stopPropagation();
  }

  getContentComponent() {
    const processingInstructions = [
      {
        shouldProcessNode: (node => node.data && node.data.match(isValueNode)),
        processNode: (node, children, index) => {
          const matches = node.data.match(isValueNode);
          const nodes = [];
          for (let i = 0, len = matches.length; i < len; i += 1) {
            const match = matches[i];
            const epName = match.substring(2, match.length - 2);

            const id = `${this.props.viewId}_tv_${epName}`;

            this.spanValues[id] = { ep: epName };

            nodes.push(
              <span className="ep" key={`${epName}-${index}`} id={id} />
            );
          }
          return nodes;
        },
      },
      {
        shouldProcessNode: () => true,
        processNode: this.processNodeDefinitions.processDefaultNode,
      },
    ];

    const comp = this.htmlToReactParser.parseWithInstructions(
      `<div>${this.template.html}</div>`,
      () => true,
      processingInstructions
    );
    return () => comp;
  }

  spanValues = {};

  updateSpanValues(props = this.props) {
    if (!props.data.values) {
      return;
    }
    requestAnimationFrame(() => {
      const spanIds = Object.keys(this.spanValues);
      for (let i = 0; i < spanIds.length; i += 1) {
        const id = spanIds[i];
        const sv = this.spanValues[id];
        const ep = this.props.entryPoints[sv.ep];
        if (ep) {
          const val = props.data.values[sv.ep] || {};
          if (!sv.el) {
            sv.el = document.getElementById(id);
          }
          sv.el.innerHTML = ep.error ? 'Invalid entry point' : val.value || '';
          if (ep.error) {
            sv.el.setAttribute('title', ep.error);
          }

          const s = memoizedGetTextStyles(ep.error ? '#FF0000' : val.color || '#00FF00');
          sv.el.style.color = s.color;
          sv.el.style.textShadow = s.textShadow;
        }
      }
    });
  }

  handleSubmit = (values) => {
    const { viewId, updateContent } = this.props;
    updateContent(viewId, values.html);
  }

  htmlToReactParser = new Parser();
  processNodeDefinitions = new ProcessNodeDefinitions(React);

  render() {
    const { viewId } = this.props;

    logger.debug(`render ${viewId}`);

    return (
      <DroppableContainer
        onDrop={this.onDrop}
        onContextMenu={this.onContextMenu}
      >
        <this.content />
      </DroppableContainer>
    );
  }
}

import React, { PureComponent, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
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
import LinksContainer from '../../../../windowProcess/View/LinksContainer';

import DroppableContainer from '../../../../windowProcess/common/DroppableContainer';
import handleContextMenu from '../../../../windowProcess/common/handleContextMenu';

const logger = getLogger('view:text');

const getComObject = _.propOr('UNKNOWN_COM_OBJECT', 0);

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
    openInspector: PropTypes.func.isRequired,
    openEditor: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    isViewsEditorOpen: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      values: PropTypes.object,
    }),
    mainMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
    isInspectorOpened: PropTypes.bool.isRequired,
    inspectorEpId: PropTypes.string,
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
    data: {
      values: {},
    },
    entryPoints: {},
    inspectorEpId: null,
    links: [],
    showLinks: false,
  };

  componentWillMount() {
    this.template = { html: beautifyHtml(this.props.content, { indent_size: 2 }) };
    this.content = this.getContentComponent();
  }

  componentDidMount() {
    this.updateSpanValues(this.props.data);
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
    if (nextProps.showLinks !== this.props.showLinks) {
      shouldRender = true;
    }
    if (!shouldRender) {
      this.updateSpanValues(nextProps.data);
    }
    return shouldRender;
  }

  componentDidUpdate() {
    this.updateSpanValues(this.props.data);
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
    const span = getEpSpan(event.target);
    const separator = { type: 'separator' };
    if (span) {
      const epName = _get(this.spanValues, [span.id, 'ep']);
      const editorMenu = [{
        label: `Open ${epName} in Editor`,
        click: () => {
          openEditor(epName);
        },
      }];
      if (isViewsEditorOpen) {
        editorMenu.push({
          label: 'Close Editor',
          click: () => closeEditor(),
        });
      }
      const inspectorLabel = `Open ${epName} in Inspector`;
      if (_get(entryPoints, [epName, 'error'])) {
        const inspectorMenu = {
          label: inspectorLabel,
          enabled: false,
        };
        handleContextMenu([inspectorMenu, ...editorMenu, separator, ...mainMenu]);
        return;
      }
      const { id, dataId, field } = entryPoints[epName];
      const opened = isInspectorOpened && (inspectorEpId === id);
      const inspectorMenu = {
        label: inspectorLabel,
        type: 'checkbox',
        click: () => openInspector({
          epId: id,
          dataId,
          epName,
          field,
        }),
        checked: opened,
      };
      handleContextMenu([inspectorMenu, ...editorMenu, separator, ...mainMenu]);
      return;
    }
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


  onDrop = (e) => {
    const data = e.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);

    if (!_get(content, 'catalogName')) {
      return;
    }

    this.props.addEntryPoint(
      parseDragData(content)
    );
    this.props.openEditor();

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

  updateSpanValues(data) {
    if (!data.values) {
      return;
    }
    requestAnimationFrame(() => {
      const spanIds = Object.keys(this.spanValues);
      for (let i = 0; i < spanIds.length; i += 1) {
        const id = spanIds[i];
        const sv = this.spanValues[id];
        const ep = this.props.entryPoints[sv.ep];
        if (ep) {
          const val = data.values[sv.ep] || {};
          if (!sv.el) {
            sv.el = document.getElementById(id);
          }
          let v = val.value;
          if (v === undefined) {
            v = '';
          }
          sv.el.innerHTML = ep.error ? 'Invalid entry point' : v;
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
    const { updateContent } = this.props;
    updateContent(values.html);
  }

  toggleShowLinks = (e) => {
    e.preventDefault();
    const { showLinks, updateShowLinks } = this.props;
    updateShowLinks(!showLinks);
  }
  removeLink = (e, index) => {
    e.preventDefault();
    const { removeLink } = this.props;
    removeLink(index);
  }

  htmlToReactParser = new Parser();
  processNodeDefinitions = new ProcessNodeDefinitions(React);

  render() {
    const { viewId, links, pageId, showLinks } = this.props;
    logger.debug(`render ${viewId}`);
    const style = { padding: '15px' };

    return (
      <DroppableContainer
        onDrop={this.onDrop}
        onContextMenu={this.onContextMenu}
        className="h100 posRelative"
      >
        <Row>
          <Col xs={12}>
            <this.content />
          </Col>
          <Col xs={12} style={style}>
            <LinksContainer
              show={showLinks}
              toggleShowLinks={this.toggleShowLinks}
              links={links}
              removeLink={this.removeLink}
              pageId={pageId}
            />
          </Col>
        </Row>
      </DroppableContainer>
    );
  }
}

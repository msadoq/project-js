import React, { PureComponent, PropTypes } from 'react';
import {
  Parser,
  ProcessNodeDefinitions,
} from 'html-to-react';
import _ from 'lodash/fp';
import _get from 'lodash/get';
import getLogger from 'common/log';
import { html as beautifyHtml } from 'js-beautify';
import {
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
// import mitt from 'mitt';

import {
  DEFAULT_FIELD,
} from 'common/constants';

import WYSIWYG from './WYSIWYG';
// import TextViewSpan from './TextViewSpan';

import DroppableContainer from '../../../lib/windowProcess/common/DroppableContainer';

import styles from './TextView.css';

const logger = getLogger('view:text');

// const emitter = mitt();

const getComObject =
  _.propOr('UNKNOWN_COM_OBJECT', 0);

const renderMethod = 1; // html-to-react
// const renderMethod = 2; // raw html injection
// const renderMethod = 3; // using mitt, event listenner and ref  dom updating needs npm i mitt

// parse clipboard data to create partial entry point
function parseDragData(data) {
  return {
    name: data.item,
    connectedData: {
      formula: `${data.catalogName}.${data.item}<${getComObject(data.comObjects)}>.${DEFAULT_FIELD}`,
    },
  };
}

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
  color
});

export default class TextView extends PureComponent {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    data: PropTypes.shape({
      values: PropTypes.object,
    }),
    addEntryPoint: PropTypes.func,
    content: PropTypes.string,
    isViewsEditorOpen: PropTypes.bool,
    updateContent: PropTypes.func,
    entryPoints: PropTypes.array.isRequired,
    show: PropTypes.string
  };
  static defaultProps = {
    data: {
      values: {},
    },
  };

  componentWillMount() {
    this.template = beautifyHtml(this.props.content, { indent_size: 2 });
  }

  componentDidMount() {
    if (renderMethod === 2) this.getComponent2();
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.viewId === this.props.viewId &&
      nextProps.data === this.props.data &&
      nextProps.content === this.props.content &&
      nextProps.isViewsEditorOpen === this.props.isViewsEditorOpen &&
      nextProps.entryPoints === this.props.entryPoints &&
      nextProps.show === this.props.show
    ) {
      return false;
    }
    return true;
  }

  componentWillUpdate() {
    if (renderMethod === 2) this.getComponent2();
  }

  onDrop = ::this.onDrop;

  onDrop(e) {
    const data = e.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);

    if (!_get(content, 'catalogName')) {
      return;
    }

    // eslint-disable-next-line no-console
    this.props.addEntryPoint(
      this.props.viewId,
      parseDragData(content)
    );

    e.stopPropagation();
  }

  /*
  getComponent3 = () => {
    const matchesStringMatches = this.template.match(/{{\s*([^}]+)\s*}}/g);
    if (matchesStringMatches) {
      this.matchesString = matchesStringMatches.join(',');
    }
    const processingInstructions = [
      {
        shouldProcessNode: node => node.data && node.data.match(/{{\s*([^}]+)\s*}}/g),
        processNode: (node, children, index) => {
          const matches = node.data.match(/{{\s*([^}]+)\s*}}/g);
          const nodes = [];
          for (let i = 0, len = matches.length; i < len; i += 1) {
            const match = matches[i];
            const epName = match.substring(2, match.length - 2);
            const valueObj = _get(this.props.data, `values[${epName}]`, {});
            const ep = _.prop(
              epName,
              _.indexBy(
                _.prop('name'),
                this.props.entryPoints)
            );
            if (ep) {
              const s = ep.error ?
              {
                style: getTextStyle('#FF0000'),
              }
              :
              {
                style: getTextStyle(_get(valueObj, ['color'])),
                className: styles[`monit-${_get(valueObj, 'monit')}`] || styles['monit-ok'],
              };
              const value = _.propOr(
                _.prop('value', valueObj),
                'error', ep);

              nodes.push(React.createElement(TextViewSpan, {
                key: `${index}-${i}`,
                ...s,
                value,
                epName,
                emitter,
                viewId: this.props.viewId
              }));
            }
          }
          return nodes;
        }
      },
      {
        shouldProcessNode: () => true,
        processNode: this.processNodeDefinitions.processDefaultNode,
      },
    ];

    this.tree = this.htmlToReactParser.parseWithInstructions(
      `<div>${this.template}</div>`,
      () => true,
      processingInstructions
    );
    return this.tree;
  }
  */

  getComponent() {
    const processingInstructions = [
      {
        shouldProcessNode: node => node.data && node.data.match(/{{\s*([^}]+)\s*}}/g),
        processNode: (node, children, index) => {
          const matches = node.data.match(/{{\s*([^}]+)\s*}}/g);
          const nodes = [];
          for (let i = 0, len = matches.length; i < len; i += 1) {
            const match = matches[i];
            const epName = match.substring(2, match.length - 2);
            const valueObj = _get(this.props.data, `values[${epName}]`, {});
            const ep = _.prop(
              epName,
              _.indexBy(
                _.prop('name'),
                this.props.entryPoints)
            );
            if (ep) {
              const s = ep.error ?
              {
                style: getTextStyle('#FF0000'),
              }
              :
              {
                style: getTextStyle(_get(valueObj, ['color'])),
                className: styles[`monit-${_get(valueObj, 'monit')}`] || styles['monit-ok'],
              };
              const value = _.propOr(
                _.prop('value', valueObj),
                'error', ep);

              if (ep.error) {
                nodes.push(
                  <OverlayTrigger
                    key={`${index}-${i}`}
                    overlay={<Tooltip id="tooltip">{value}</Tooltip>}
                  >
                    <span
                      style={s.style}
                    >
                      Invalid entry point
                    </span>
                  </OverlayTrigger>
                );
              } else {
                nodes.push(
                  <span
                    key={`${index}-${i}`}
                    style={s.style}
                  >
                    {value}
                  </span>
                );
              }
            }
          }
          return nodes;
        }
      },
      {
        shouldProcessNode: () => true,
        processNode: this.processNodeDefinitions.processDefaultNode,
      },
    ];

    return this.htmlToReactParser.parseWithInstructions(
      `<div>${this.template}</div>`,
      () => true,
      processingInstructions
    );
  }

  getComponent2 = () => {
    const matches = this.template.match(/{{\s*([^}]+)\s*}}/g);
    let templated = this.template;
    matches.forEach((match) => {
      const epName = match.substring(2, match.length - 2);
      const valueObj = _get(this.props.data, `values[${epName}]`, {});
      const ep = this.props.entryPoints.find(e => e.name === epName);
      if (ep) {
        let tag = '';
        const value = valueObj.value || ep.error;
        if (ep.error) {
          tag = `<span style="${getTextStyle('#FF0000')}">${value}</span>`;
        } else {
          tag = `<span
            class="${styles[`monit-${_get(valueObj, 'monit')}`] || styles['monit-ok']}"
            style="${getTextStyle(valueObj.color)}">
              ${value}
            </span>`;
        }
        templated = templated.replace(match, tag);
      }
    });
    this.textViewBodyEl.innerHTML = templated;
  }

  /*
  process3 = () => {
    const {
      viewId,
      entryPoints,
      data,
    } = this.props;

    const matches = this.template.match(/{{\s*([^}]+)\s*}}/g);
    const updatedDatas = {};
    matches.forEach((match) => {
      const epName = match.substring(2, match.length - 2);
      const valueObj = _get(data, `values[${epName}]`, {});
      const ep = entryPoints.find(e => e.name === epName);
      const value = valueObj.value || ep.error;
      let className;
      let style;
      if (ep) {
        if (ep.error) {
          style = getTextStyle('#FF0000');
        } else {
          style = getTextStyle(valueObj.color);
          className = styles[`monit-${_get(valueObj, 'monit')}`] || styles['monit-ok'];
        }
        updatedDatas[epName] = { className, style, value };
      }
      emitter.emit(`${viewId}-update`, updatedDatas);
    });
  }
  */

  handleSubmit = (values) => {
    const { viewId, updateContent } = this.props;
    updateContent(viewId, values.html);
  }

  htmlToReactParser = new Parser();
  processNodeDefinitions = new ProcessNodeDefinitions(React);

  render() {
    const {
      viewId,
      isViewsEditorOpen,
      entryPoints,
    } = this.props;
    logger.debug(`render ${viewId}`);

    /*
    const matchesString = this.template.match(/{{\s*([^}]+)\s*}}/g);
    if (matchesString && this.matchesString && matchesString.join(',') === this.matchesString) {
      this.process3();
    }
    */

    if (renderMethod === 1) {
      return (isViewsEditorOpen && this.props.show === 'html'
        ? <WYSIWYG
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
          initialValues={{ html: this.template }}
          entryPoints={entryPoints.map(ep => ep.name)}
          onSubmit={this.handleSubmit}
          form={`textView-form-${viewId}`}
        />
        : <DroppableContainer
          onDrop={this.onDrop}
        >
          {this.getComponent()}
        </DroppableContainer>);
    }

    if (renderMethod === 2) {
      return (isViewsEditorOpen
        ? <WYSIWYG
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
          initialValues={{ html: this.template }}
          entryPoints={entryPoints.map(ep => ep.name)}
          onSubmit={this.handleSubmit}
          form={`textView-form-${viewId}`}
        />
        : <DroppableContainer
          onDrop={this.onDrop}
        >
          <div
            ref={(el) => { this.textViewBodyEl = el; }}
          />
        </DroppableContainer>
      );
    }

    /*
    if (renderMethod === 3) {
      return (isViewsEditorOpen
        ? <WYSIWYG
          initialValues={{ html: this.template }}
          entryPoints={entryPoints.map(ep => ep.name)}
          onSubmit={this.handleSubmit}
          form={`textView-form-${viewId}`}
        />
        : <DroppableContainer
          onDrop={this.onDrop.bind(this)}
          text={'add entry point'}
        >
          {this.tree || this.getComponent3()}
        </DroppableContainer>);
    }
    */
  }
}

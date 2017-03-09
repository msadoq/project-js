import React, { PureComponent, PropTypes } from 'react';
import {
  Parser,
  ProcessNodeDefinitions,
} from 'html-to-react';
import _ from 'lodash/fp';
import _get from 'lodash/get';
import getLogger from 'common/log';
import { html as beautifyHtml } from 'js-beautify';
import { get } from 'common/parameters';

import TextViewValue from './TextViewValue';
import DroppableContainer from '../../../../windowProcess/common/DroppableContainer';

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

export default class TextView extends PureComponent {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    data: PropTypes.shape({
      values: PropTypes.object,
    }),
    addEntryPoint: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    updateContent: PropTypes.func.isRequired,
    entryPoints: PropTypes.shape({}).isRequired,
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
    ['isViewsEditorOpen', 'show', 'addEntryPoint', 'addEntryPoint', 'data'].forEach((attr) => {
      if (nextProps[attr] !== this.props[attr]) {
        shouldRender = true;
      }
    });
    return shouldRender;
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

            const getEntryPoint = _epName => () => this.props.entryPoints[_epName];
            const getValue = _epName => () =>
              _get(this.props.data, `values[${_epName}]`, {});

            nodes.push(
              <TextViewValue
                key={`${epName}-${index}`}
                getEntryPoint={getEntryPoint(epName)}
                getValue={getValue(epName)}
              />
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
      <DroppableContainer onDrop={this.onDrop}>
        <this.content />
      </DroppableContainer>
    );
  }
}

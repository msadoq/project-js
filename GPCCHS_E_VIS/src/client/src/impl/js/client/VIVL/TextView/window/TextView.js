import React, { PureComponent, PropTypes } from 'react';
import { Parser, ProcessNodeDefinitions } from 'html-to-react';
import _ from 'lodash/fp';
import _get from 'lodash/get';
import getLogger from 'common/log';
import { html as beautifyHtml } from 'js-beautify';
import {
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import {
  DEFAULT_FIELD,
} from 'common/constants';

import WYSIWYG from './WYSIWYG';

import DroppableContainer from '../../../lib/windowProcess/View/DroppableContainer';

import styles from './TextView.css';

const logger = getLogger('view:text');

const getComObject =
  _.propOr('UNKNOWN_COM_OBJECT', 0);

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
  };
  static defaultProps = {
    data: {
      values: {},
    },
  };

  componentWillMount() {
    this.template = beautifyHtml(this.props.content, { indent_size: 2 });
  }

  onDrop(e) {
    const data = e.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);

    // eslint-disable-next-line no-console
    this.props.addEntryPoint(
      this.props.viewId,
      parseDragData(content)
    );
  }

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
              const s = ep.error ? {
                style: getTextStyle('#FF0000')
              } : {
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
    const component = this.getComponent();
    logger.debug(`render ${viewId}`);

    return isViewsEditorOpen
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
        {component}
      </DroppableContainer>;
  }
}

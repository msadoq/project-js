import React, { Component, PropTypes } from 'react';
import { Parser, ProcessNodeDefinitions } from 'html-to-react';
import _get from 'lodash/get';
import debug from '../../../lib/common/debug/windowDebug';

const logger = debug('view:text');

export default class TextView extends Component {
  static propTypes = {
    // viewId: PropTypes.string.isRequired,
    data: PropTypes.shape({
      values: PropTypes.object,
    }),
    configuration: PropTypes.object.isRequired,
    // entryPoints: PropTypes.array.isRequired,
    // links: PropTypes.array,
    // defaultRatio: PropTypes.object,
  };
  static defaultProps = {
    data: {
      values: {},
    },
  };

  componentWillMount() {
    this.template = this.props.configuration.content.join('');
  }

  getComponent() {
    // console.time('view:text parse template');
    const processingInstructions = [
      {
        shouldProcessNode: node => node.data && node.data.match(/{{\s*([^}]+)\s*}}/g),
        processNode: (node, children, index) => {
          const matches = node.data.match(/{{\s*([^}]+)\s*}}/g);
          const nodes = [];
          for (let i = 0, len = matches.length; i < len; i += 1) {
            const match = matches[i];
            const value = match.substring(2, match.length - 2);
            nodes.push(React.createElement('span', {
              key: `${index}-${i}`
            }, _get(this.props, `data.values[${value}]`)));
          }
          return nodes;
        }
      },
      {
        shouldProcessNode: () => true,
        processNode: this.processNodeDefinitions.processDefaultNode,
      },
    ];
    const component = this.htmlToReactParser.parseWithInstructions(
      `<div>${this.template}</div>`,
      () => true,
      processingInstructions
    );
    // console.timeEnd('view:text parse template');
    return component;
  }

  htmlToReactParser = new Parser();
  processNodeDefinitions = new ProcessNodeDefinitions(React);

  render() {
    const { configuration: { title } } = this.props;
    const component = this.getComponent();
    logger.debug(`render ${title}`);

    return (
      <div>
        {component}
      </div>
    );
  }
}

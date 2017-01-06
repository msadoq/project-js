import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Parser, ProcessNodeDefinitions } from 'html-to-react';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import getLogger from 'common/log';
import { html as beautifyHtml } from 'js-beautify';
import { DEFAULT_FIELD } from 'common/constants';

import WYSIWYG from './WYSIWYG';

import { addEntryPoint } from '../../../lib/store/actions/views';
import { getTextViewData } from '../../../lib/store/selectors/views';
import DroppableContainer from '../../../lib/windowProcess/View/DroppableContainer';

import styles from './TextView.css';

const logger = getLogger('GPCCHS:view:text');

// parse clipboard data to create partial entry point
function parseDragData(data) {
  return {
    name: data.item.match(/(.+)</)[1],
    connectedData: {
      formula: `${data.catalogName}.${data.item}.${DEFAULT_FIELD}`,
    },
  };
}

class TextView extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    data: PropTypes.shape({
      values: PropTypes.object,
    }),
    addEntryPoint: PropTypes.func,
    configuration: PropTypes.object.isRequired,
    isViewsEditorOpen: PropTypes.bool,
    updateContent: PropTypes.func,
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
    this.template = beautifyHtml(this.props.configuration.content, { indent_size: 2 });
  }

  onDrop(e) {
    const data = e.dataTransfer.getData('application/json');
    const content = JSON.parse(data);

    // eslint-disable-next-line no-console
    this.props.addEntryPoint(
      this.props.viewId,
      parseDragData(content)
    );
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
            const epName = match.substring(2, match.length - 2);
            const valueObj = _get(this.props.data, `values[${epName}]`);

            nodes.push(React.createElement('span', {
              key: `${index}-${i}`,
              style: {
                backgroundColor: _get(valueObj, ['color'])
              },
              className: styles[`monit-${_get(valueObj, 'monit')}`] || styles['monit-ok'],
            }, _get(valueObj, 'value')));
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
      configuration: { title, entryPoints }
    } = this.props;
    const component = this.getComponent();
    logger.debug(`render ${title}`);

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

export default connect(
  state => ({
    state
  }),
  dispatch => bindActionCreators({
    addEntryPoint
  }, dispatch),
  (stateProps, dispatchProps, ownProps) => {
    const data = getTextViewData(stateProps.state, ownProps.viewId);
    console.log('DATA', data);
    return _omit({
      ...stateProps,
      ...dispatchProps,
      ...ownProps,
      data
    }, ['state']);
  }
)(TextView);

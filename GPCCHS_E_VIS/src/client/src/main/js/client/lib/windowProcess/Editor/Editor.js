import _ from 'lodash/fp';
import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import getLogger from 'common/log';
import { getEditorComponent } from '../../viewManager/components';
import styles from './Editor.css';

const logger = getLogger('Editor');

const InvalidConfiguration = () => (
  <div>
    <p
      className={classnames('p10', 'text-center', styles.invalidConfiguration)}
    >
      Unknown view type or invalid configuration
    </p>
  </div>
);

export default class Editor extends PureComponent {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    viewId: PropTypes.string,
    type: PropTypes.string,
  };

  static defaultProps = {
    closeEditor: _.noop,
    viewId: null,
    type: null,
  };

  static childContextTypes = {
    viewId: React.PropTypes.string,
  }

  getChildContext() {
    return {
      viewId: this.props.viewId,
    };
  }

  render() {
    logger.debug('render');
    const {
      pageId,
      type,
      viewId,
    } = this.props;

    let EditorComponent;
    if (!viewId) {
      EditorComponent = InvalidConfiguration;
    } else {
      EditorComponent = getEditorComponent(type);
    }

    return (
      <div className={classnames('subdiv', 'h100', styles.editor)}>
        <EditorComponent
          viewId={viewId}
          pageId={pageId}
        />
      </div>
    );
  }
}

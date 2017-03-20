import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import getLogger from 'common/log';
import PlotEditor from '../../viewManager/PlotView/Components/Editor/PlotEditorContainer';
import TextEditor from '../../viewManager/TextView/Components/Editor/TextEditorContainer';
import DynamicEditor from '../../viewManager/DynamicView/Components/Editor/DynamicEditorContainer';
import styles from './Editor.css';

const logger = getLogger('Editor');

const InvalidConfiguration = () => <div>unknown view type or invalid configuration</div>;

export default class Editor extends PureComponent {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    closeEditor: PropTypes.func,
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
      closeEditor,
    } = this.props;

    let ContentComponent;
    switch (type) {
      case 'PlotView':
        ContentComponent = PlotEditor;
        break;
      case 'TextView':
        ContentComponent = TextEditor;
        break;
      case 'DynamicView':
        ContentComponent = DynamicEditor;
        break;
      default:
        ContentComponent = InvalidConfiguration;
    }

    return (
      <div className={classnames('subdiv', styles.editor)}>
        <ContentComponent
          viewId={viewId}
          pageId={pageId}
          closeEditor={closeEditor}
        />
      </div>
    );
  }
}

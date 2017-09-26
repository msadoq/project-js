// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 08/02/2017 : Lint debug Editor.js Components/Plot/PlotMarkers.js Components/ViewParams.js . . .
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Fix editor panel display without viewId set in page panels
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix editor panel display without viewId set in page panels
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Add getEditorComponent . . .
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Handle panel collapse/expand buttons with css instead of JE and react refs.
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Reviewing style for invalid configuration / unknown type message in editor.
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : Collapse/minimize Editor/Explorer : buttons are in Window.js
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : No vertical bar when editor minimized.
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Fix 'npm run build' .
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6129 : 09/05/2017 : Merge branch 'dev' into abesson-mimic
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #7256 : 20/07/2017 : Working on cleaning style, added variables to edit style easily.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

// import _ from 'lodash/fp';
import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import getLogger from '../../common/logManager';
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
    type: PropTypes.string.isRequired,
  };

  static defaultProps = {
    // closeEditor: _.noop,
    viewId: null,
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
      <div className={classnames('Editor', 'subdiv', 'h100', styles.editor)}>
        <EditorComponent
          viewId={viewId}
          pageId={pageId}
        />
      </div>
    );
  }
}

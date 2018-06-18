// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Plot & Text editor panels and sub-panels are stored
//  in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Plot & Text editor panels and sub-panels are stored
//  in store.
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files.
//  Possibility to add it in editor using context menu
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import Collapse, { Panel } from 'rc-collapse';
import {
  Button,
} from 'react-bootstrap';
import ViewParamsContainer from 'viewManager/commonEditor/ViewParamsContainer';

export default class TextTab extends React.Component {
  static propTypes = {
    openCodeEditor: PropTypes.func.isRequired,
    viewId: PropTypes.string.isRequired,
    closeCodeEditor: PropTypes.func.isRequired,
    codeEditorViewId: PropTypes.string,
    updateViewPanels: PropTypes.func.isRequired,
    panels: PropTypes.shape({}).isRequired,
  }

  static defaultProps = {
    codeEditorViewId: null,
  }

  onChange = (openPanels) => {
    const { updateViewPanels, viewId } = this.props;
    updateViewPanels(viewId, 'panels', openPanels);
  }

  render() {
    const {
      closeCodeEditor,
      codeEditorViewId,
      openCodeEditor,
      panels,
      viewId,
    } = this.props;

    return (
      <div>
        <Collapse
          accordion={false}
          onChange={this.onChange}
          defaultActiveKey={Object.keys(panels)}
        >
          <Panel
            header="Parameters"
            key="parameters"
          >
            {panels.parameters && <ViewParamsContainer viewId={viewId} />}
          </Panel>
        </Collapse>
        {
          codeEditorViewId === viewId ?
            <Button onClick={() => closeCodeEditor()} className="center-block mt20">Close HTML Editor</Button> :
            <Button onClick={() => openCodeEditor(viewId)} className="center-block mt20">Open HTML Editor</Button>
        }
      </div>
    );
  }
}

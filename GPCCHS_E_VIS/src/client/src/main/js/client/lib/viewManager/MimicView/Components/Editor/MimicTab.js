// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files. Possibility to add it in editor using context menu
// VERSION : 1.1.2 : DM : #6816 : 13/09/2017 : Its possible to change the size of the mimic in the view ezeditor
// VERSION : 1.1.2 : FA : #7753 : 19/09/2017 : MimicTab editor component uses rc-collapse instead of bootstrap collapse.
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import Collapse from 'rc-collapse';
import {
  Button,
} from 'react-bootstrap';
import ViewParamsContainer from '../../../commonEditor/ViewParamsContainer';
import DimensionsContainer from './DimensionsContainer';

const { Panel } = Collapse;

export default class MimicTab extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    openCodeEditor: PropTypes.func.isRequired,
    closeCodeEditor: PropTypes.func.isRequired,
    codeEditorViewId: PropTypes.string,
    panels: PropTypes.shape({}).isRequired,
    updateViewPanels: PropTypes.func.isRequired,
  }

  static defaultProps = {
    codeEditorViewId: null,
  }

  static contextTypes = {
    viewId: React.PropTypes.string,
  };


  onChange = (openPanels) => {
    const { updateViewPanels, viewId } = this.props;
    updateViewPanels(viewId, 'panels', openPanels);
  }

  render() {
    const { panels, viewId } = this.props;

    return (
      <div>
        <Collapse
          accordion={false}
          onChange={this.onChange}
          defaultActiveKey={Object.keys(panels)}
        >
          <Panel
            header="Parameters"
            key="parameter"
          >
            {
              panels.parameter &&
              <ViewParamsContainer viewId={viewId} />
            }

          </Panel>
          <Panel
            header="Dimensions"
            key="dimensions"
          >
            {
              panels.dimensions &&
              <DimensionsContainer viewId={viewId} />
            }
          </Panel>

        </Collapse>
        {
          this.props.codeEditorViewId === viewId ?
            <Button onClick={() => this.props.closeCodeEditor()} className="center-block mt20">Close HTML Editor</Button> :
            <Button onClick={() => this.props.openCodeEditor(viewId)} className="center-block mt20">Open HTML Editor</Button>
        }
      </div>
    );
  }
}

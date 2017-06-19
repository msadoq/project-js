import React, { PropTypes } from 'react';
import Collapse, { Panel } from 'rc-collapse';
import {
  Button,
} from 'react-bootstrap';
import ViewParamsContainer from '../../../commonEditor/ViewParamsContainer';

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

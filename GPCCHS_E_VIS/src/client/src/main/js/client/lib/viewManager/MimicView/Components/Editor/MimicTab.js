import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel,
  Button,
} from 'react-bootstrap';
import ViewParamsContainer from '../../../commonEditor/ViewParamsContainer';

export default class MimicTab extends React.Component {
  static propTypes = {
    openCodeEditor: PropTypes.func.isRequired,
    closeCodeEditor: PropTypes.func.isRequired,
    codeEditorViewId: PropTypes.string,
  }
  static defaultProps = {
    codeEditorViewId: null,
  }
  static contextTypes = {
    viewId: React.PropTypes.string,
  };
  state = {
    isTitleOpen: false,
  };

  openTitle = () => this.setState({ isTitleOpen: true });
  closeTitle = () => this.setState({ isTitleOpen: false });

  render() {
    const { viewId } = this.context;
    const { isTitleOpen } = this.state;
    return (
      <div>
        <Accordion>
          <Panel
            header="Parameters"
            eventKey="1"
            expanded={isTitleOpen}
            onSelect={this.openTitle}
            onExited={this.closeTitle}
          >
            {isTitleOpen && <ViewParamsContainer viewId={viewId} />}
          </Panel>
        </Accordion>
        {
          this.props.codeEditorViewId === viewId ?
            <Button onClick={() => this.props.closeCodeEditor()} className="center-block mt20">Close HTML Editor</Button> :
            <Button onClick={() => this.props.openCodeEditor(viewId)} className="center-block mt20">Open HTML Editor</Button>
        }
      </div>
    );
  }
}

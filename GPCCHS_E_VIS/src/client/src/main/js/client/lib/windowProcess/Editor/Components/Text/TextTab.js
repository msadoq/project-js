import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel,
} from 'react-bootstrap';
import ViewParamsContainer from '../ViewParamsContainer';

export default class TextTab extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    handleTextTitle: PropTypes.func,
    titleStyle: PropTypes.object,
    handleTextTitleStyle: PropTypes.func,
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
    );
  }
}

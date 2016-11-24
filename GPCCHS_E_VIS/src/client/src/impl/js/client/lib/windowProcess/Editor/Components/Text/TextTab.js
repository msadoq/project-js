import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel
} from 'react-bootstrap';
import ViewTitleContainer from '../ViewTitleContainer';

export default class PlotTab extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    handlePlotTitle: PropTypes.func,
    titleStyle: PropTypes.object,
    handlePlotTitleStyle: PropTypes.func
  }
  static contextTypes = {
    viewId: React.PropTypes.string
  };
  state = {
    isTitleOpen: false
  };

  openTitle = () => this.setState({ isTitleOpen: true });
  closeTitle = () => this.setState({ isTitleOpen: false });

  render() {
    const { viewId } = this.context;
    const { isTitleOpen } = this.state;

    return (
      <Accordion>
        <Panel
          header="Title"
          eventKey="1"
          expanded={isTitleOpen}
          onSelect={this.openTitle}
          onExited={this.closeTitle}
        >
          {isTitleOpen && <ViewTitleContainer viewId={viewId} />}
        </Panel>
      </Accordion>
    );
  }
}

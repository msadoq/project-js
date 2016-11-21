import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel
} from 'react-bootstrap';
import ViewTitle from '../ViewTitle';

export default class PlotTab extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    handlePlotTitle: PropTypes.func,
    titleStyle: PropTypes.object,
    handlePlotTitleStyle: PropTypes.func
  }
  state = {
    isTitleOpen: false
  };

  openTitle = () => this.setState({ isTitleOpen: true });
  closeTitle = () => this.setState({ isTitleOpen: false });

  render() {
    const {
      isTitleOpen
    } = this.state;
    const {
      title,
      titleStyle,
      handlePlotTitle,
      handlePlotTitleStyle
    } = this.props;

    return (
      <Accordion>
        <Panel
          header="Title"
          eventKey="1"
          expanded={isTitleOpen}
          onSelect={this.openTitle}
          onExited={this.closeTitle}
        >
          {isTitleOpen && <ViewTitle
            titleStyle={titleStyle}
            title={title}
            onTitleChange={handlePlotTitle}
            onTitleStyleChange={handlePlotTitleStyle}
          />}
        </Panel>
      </Accordion>
    );
  }
}

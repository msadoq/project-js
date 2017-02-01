import React, { PropTypes } from 'react';
import PlotGrid from './PlotGrid';

export default class PlotAxes extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    grids: PropTypes.array.isRequired,
    axes: PropTypes.object.isRequired,
    updateGrid: PropTypes.func.isRequired
  }
  state = { };

  openPanel = key => this.setState({ [`isPanel${key}Open`]: true });
  closePanel = key => this.setState({ [`isPanel${key}Open`]: false });

  handleSubmit(key, values) {
    const { updateGrid, viewId } = this.props;
    updateGrid(viewId, key, values);
  }

  handleSubmit = this.handleSubmit.bind(this, 0)

  render() {
    const {
      axes,
      grids,
      viewId
    } = this.props;

    return (
      <PlotGrid
        axes={axes}
        initialValues={grids[0]}
        onSubmit={this.handleSubmit}
        form={`grid-form-${0}-${viewId}`}
      />
    );
  }
}
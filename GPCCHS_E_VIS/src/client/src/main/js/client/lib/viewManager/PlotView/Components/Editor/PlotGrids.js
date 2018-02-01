// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// END-HISTORY
// ====================================================================

import React, { Component, PropTypes } from 'react';
import PlotGrid from './PlotGrid';

export default class PlotGrids extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    grids: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    axes: PropTypes.shape({}).isRequired,
    updateGrid: PropTypes.func.isRequired,
  }

  handleSubmit(key, values) {
    const { updateGrid, viewId } = this.props;
    updateGrid(viewId, key, values);
  }

  handleSubmitFilled = this.handleSubmit.bind(this, 0)

  render() {
    const {
      axes,
      grids,
      viewId,
    } = this.props;

    return (
      <PlotGrid
        axes={axes}
        initialValues={grids[0]}
        onSubmit={this.handleSubmitFilled}
        form={`grid-form-${0}-${viewId}`}
      />
    );
  }
}

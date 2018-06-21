// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6816 : 13/09/2017 : Its possible to change the size of the mimic in the
//  view ezeditor
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import DimensionsForm from './DimensionsForm';

export default class Dimensions extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    updateDimensions: PropTypes.func.isRequired,
  }

  handleSubmit = (values) => {
    const {
      updateDimensions,
    } = this.props;

    if (this.props.width !== values.width || this.props.height !== values.height) {
      updateDimensions(values.width, values.height);
    }
  }

  render() {
    const {
      viewId,
      width,
      height,
    } = this.props;
    const initVals = {
      width: width || 0,
      height: height || 0,
    };

    return (
      <ErrorBoundary>
        <DimensionsForm
          initialValues={initVals}
          onSubmit={this.handleSubmit}
          form={`view-dimensions-form-${viewId}`}
          height={height}
          width={width}
        />
      </ErrorBoundary>
    );
  }
}

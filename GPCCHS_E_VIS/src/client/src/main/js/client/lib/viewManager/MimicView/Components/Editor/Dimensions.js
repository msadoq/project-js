import React, { PropTypes } from 'react';
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
      <DimensionsForm
        initialValues={initVals}
        onSubmit={this.handleSubmit}
        form={`view-dimensions-form-${viewId}`}
        height={height}
        width={width}
      />
    );
  }
}

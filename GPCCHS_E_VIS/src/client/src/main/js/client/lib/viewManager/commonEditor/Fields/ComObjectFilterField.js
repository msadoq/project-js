import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import { computeOptions } from './common';

export default class ComObjectFilterField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    // from container
    domainName: PropTypes.string,
    timelineId: PropTypes.string,
    catalogName: PropTypes.string,
    itemName: PropTypes.string,
    comObjectName: PropTypes.string,
    comObjectFields: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.shape),
    ]),
  };

  static defaultProps = {
    comObjectFields: null,
    domainName: null,
    timelineId: null,
    catalogName: null,
    itemName: null,
    comObjectName: null,
  };

  handleChange = (selectedOption) => {
    this.props.onChange(selectedOption ? selectedOption.value : null);
  };

  render() {
    const {
      comObjectFields,
      domainName,
      timelineId,
      catalogName,
      itemName,
      comObjectName,
      value,
    } = this.props;
    const disabled = !domainName || !timelineId || !catalogName || !itemName ||
      !comObjectName || comObjectFields === null;
    return (
      <ErrorBoundary>
        <Select
          onBlur={this.onBlur}
          onChange={this.handleChange}
          options={computeOptions(comObjectFields)}
          clearable
          autoFocus
          disabled={disabled}
          value={value}
        />
      </ErrorBoundary>
    );
  }
}

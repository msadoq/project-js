import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { computeOptions } from './common';

const { string, arrayOf, oneOfType, shape, func } = PropTypes;

export default class ComObjectFilterField extends PureComponent {
  static propTypes = {
    onChange: func.isRequired,
    value: PropTypes.object,
    // from container
    domainName: string,
    timelineId: string,
    catalogName: string,
    itemName: string,
    comObjectName: string,
    comObjectFields: oneOfType([
      string,
      arrayOf(shape),
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
    const { onChange } = this.props;
    onChange && onChange(selectedOption ? selectedOption.value : null);
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
      <Select
        onBlur={this.onBlur}
        onChange={this.handleChange}
        options={computeOptions(comObjectFields)}
        clearable
        autofocus
        disabled={disabled}
        value={value}
      />
      // <ReactSelectField
      //   format={null}
      //   component={ReactSelectField}
      //   clearable
      //   disabled={disabled}
      //   options={computeOptions(comObjectFields)}
    );
  }
}

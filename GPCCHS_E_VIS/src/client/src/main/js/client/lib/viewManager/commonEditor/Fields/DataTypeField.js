import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from '../../../windowProcess/commonReduxForm/ReactSelectField';

export const SDB_VALUE_OPTION = { label: 'SDB value', value: 'SDB_value' };
export const TIME_BASED_DATA_OPTION = { label: 'Time based data', value: 'time_based_data' };

const options = [SDB_VALUE_OPTION, TIME_BASED_DATA_OPTION];
/**
 * On Selecting “SDB Value”, display fields: Path & Display mode. On Selecting “Time Based Data”,
 * display fields: Item, ComObject, Ref Timestamp, Field, Provider.
 */
const DataTypeField = ({ onChange }) => (
  <Field
    name="connectedData.dataType"
    component={ReactSelectField}
    clearable
    options={options}
    onChange={onChange}
  />
);

DataTypeField.propTypes = {
  onChange: PropTypes.func,
};

DataTypeField.defaultProps = {
  onChange: () => {},
};

export default DataTypeField;

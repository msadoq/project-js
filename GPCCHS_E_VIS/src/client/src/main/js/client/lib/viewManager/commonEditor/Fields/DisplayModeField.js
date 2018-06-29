import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from '../../../windowProcess/commonReduxForm/ReactSelectField';

export const DISPLAY_ONLY_OPTION = { label: 'Display only', value: 'display_only' };
export const EXECUTE_AS_CODE_OPTION = { label: 'Execute as code', value: 'execute_as_code' };

const options = [DISPLAY_ONLY_OPTION, EXECUTE_AS_CODE_OPTION];

/**
 * Either "Display only" or "Execute as code". If "Execute as code", will use the Python Gateway
 * compute the results of the piece of code gathered from the SDB (see Path Field).
 * Else, it will render the value as is.
 */
const DisplayModeField = ({ onChange }) => (
  <Field
    name="connectedData.displayMode"
    component={ReactSelectField}
    clearable
    options={options}
    onChange={onChange}
  />
);

DisplayModeField.propTypes = {
  onChange: PropTypes.func,
};

DisplayModeField.defaultProps = {
  onChange: () => {},
};

export default DisplayModeField;

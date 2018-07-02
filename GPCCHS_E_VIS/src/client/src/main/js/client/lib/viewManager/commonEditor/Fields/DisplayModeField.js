import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Button, Glyphicon } from 'react-bootstrap';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import styles from './fields.css';

export const DISPLAY_ONLY_OPTION = { label: 'Display only', value: 'display_only' };
export const EXECUTE_AS_CODE_OPTION = { label: 'Execute as code', value: 'execute_as_code' };

const options = [DISPLAY_ONLY_OPTION, EXECUTE_AS_CODE_OPTION];

/**
 * Either "Display only" or "Execute as code". If "Execute as code", will use the Python Gateway
 * compute the results of the piece of code gathered from the SDB (see Path Field).
 * Else, it will render the value as is.
 */
const DisplayModeField = ({ onChange, enabled }) => (
  <div className={styles.withButtonContainer}>
    <div className={styles.withButtonMainChild}>
      <Field
        name="connectedData.displayMode"
        component={ReactSelectField}
        clearable
        options={options}
      />
    </div>
    <Button
      bsStyle="primary"
      type="button"
      className="ml10"
      onClick={onChange}
      disabled={!enabled}
    >
      <Glyphicon glyph="magnet" />
    </Button>
  </div>
);

DisplayModeField.propTypes = {
  onChange: PropTypes.func,
  enabled: PropTypes.bool.isRequired,
};

DisplayModeField.defaultProps = {
  onChange: () => {
  },
};

export default DisplayModeField;

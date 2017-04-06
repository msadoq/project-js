import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';

const SelectFontField = ({ input }) => {
  const { value, onChange } = input;
  return (
    <FormControl
      className="form-control input-sm"
      componentClass="select"
      onChange={onChange}
      value={value}
    >
      <option value="Arial">Arial</option>
      <option value="Helvetica">Helvetica</option>
    </FormControl>
  );
};

SelectFontField.propTypes = {
  input: PropTypes.shape({ value: PropTypes.string, onChange: PropTypes.func }).isRequired,
};

export default SelectFontField;

import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';
/*
export default class SelectFontField extends React.PureComponent {
  static propTypes = {
    input: PropTypes.shape({ value: PropTypes.string, onChange: PropTypes.func }).isRequired,
  }

  render() {
    const {
      input: { value, onChange },
    } = this.props;

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
  }
}*/

const SelectFontField = ({ input }) => (
  <FormControl
    className="form-control input-sm"
    componentClass="select"
    onChange={input.onChange}
    value={input.value}
  >
    <option value="Arial">Arial</option>
    <option value="Helvetica">Helvetica</option>
  </FormControl>
);

SelectFontField.propTypes = {
  input: PropTypes.shape({ value: PropTypes.string, onChange: PropTypes.func }).isRequired,
};

export default SelectFontField;

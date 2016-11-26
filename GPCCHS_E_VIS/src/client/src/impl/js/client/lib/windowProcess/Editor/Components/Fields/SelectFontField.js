import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';

export default class SelectFontField extends React.PureComponent {
  static propTypes = {
    input: PropTypes.object.isRequired
  }

  render() {
    const {
      input: { value, onChange }
    } = this.props;

    return (
      <FormControl
        className="form-control input-sm"
        componentClass="select"
        onChange={onChange}
        value={value}
      >
        <option value="arial">Arial</option>
        <option value="tahoma">Tahoma</option>
      </FormControl>
    );
  }
}

import React, { PropTypes } from 'react';
import ColorPicker from '../ColorPicker';

export default class ColorPickerField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired
  }

  render() {
    const {
      input: { value, onChange }
    } = this.props;

    return (
      <ColorPicker
        color={value}
        onChange={onChange}
        width={195}
      />
    );
  }
}

import React, { PropTypes } from 'react';
import ColorPicker from '../ColorPicker';

export default class ColorPickerField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    colors: PropTypes.array
  }

  render() {
    const {
      input: { value, onChange },
      colors
    } = this.props;

    return (
      <ColorPicker
        color={value}
        colors={colors}
        onChange={onChange}
        width={195}
      />
    );
  }
}

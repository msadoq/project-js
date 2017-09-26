// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Removal of commonReduxForm/index.js , imports must be precise.
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import ColorPicker from './ColorPicker';
import { colors as initialColors } from '../common/colors';

const ColorPickerField = (props) => {
  const {
    input: { value, onChange },
    colors,
  } = props;

  return (
    <ColorPicker
      color={value}
      colors={colors}
      onChange={onChange}
      width={195}
    />
  );
};

ColorPickerField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
  }).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
};
ColorPickerField.defaultProps = {
  colors: initialColors,
};

export default ColorPickerField;

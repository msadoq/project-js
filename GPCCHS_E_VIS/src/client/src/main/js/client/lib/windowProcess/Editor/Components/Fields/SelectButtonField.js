import React, { PropTypes } from 'react';
import SelectButton from '../Buttons/SelectButton';

export default class SelectButtonField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    buttons: PropTypes.array.isRequired,
    bsSize: PropTypes.string,
  }

  static defaultProps = {
    bsSize: 'xsmall',
  }

  render() {
    const {
      bsSize,
      buttons,
      input: { value, onChange },
    } = this.props;

    return (
      <SelectButton
        size={bsSize}
        active={value}
        buttons={buttons}
        onChange={onChange}
      />
    );
  }
}

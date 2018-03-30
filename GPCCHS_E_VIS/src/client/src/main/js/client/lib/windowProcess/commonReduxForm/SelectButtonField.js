// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import SelectButton from './SelectButton';

export default class SelectButtonField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({ value: PropTypes.string, onChange: PropTypes.func }).isRequired,
    buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
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

// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Refacto SaveWizardModal component . .
// END-HISTORY
// ====================================================================

import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'react-bootstrap';

const ConfirmationButton = ({ closeModal, disabled, label, value, type }) => (
  <Button
    className="mr10"
    disabled={disabled}
    bsStyle={type}
    onClick={() => closeModal(value)}
  >
    {label}
  </Button>
);
ConfirmationButton.propTypes = {
  closeModal: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  type: PropTypes.string,
};
ConfirmationButton.defaultProps = {
  disabled: false,
  value: undefined,
  type: 'primary',
};

export default ConfirmationButton;

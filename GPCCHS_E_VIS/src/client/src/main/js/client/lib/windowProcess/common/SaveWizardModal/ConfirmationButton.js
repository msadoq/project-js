import React, { PropTypes } from 'react';
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

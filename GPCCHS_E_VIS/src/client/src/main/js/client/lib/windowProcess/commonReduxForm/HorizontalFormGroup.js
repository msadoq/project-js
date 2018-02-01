// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import {
  FormGroup,
  Col,
  ControlLabel,
} from 'react-bootstrap';

const HorizontalFormGroup = (props) => {
  const {
    label,
    children,
  } = props;

  return (
    <FormGroup controlId="formHorizontalName">
      <Col componentClass={ControlLabel} xs={4} >
        {label}
      </Col>
      <Col xs={8}>
        {children}
      </Col>
    </FormGroup>
  );
};

HorizontalFormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

HorizontalFormGroup.defaultProps = {
  label: '',
};

export default HorizontalFormGroup;

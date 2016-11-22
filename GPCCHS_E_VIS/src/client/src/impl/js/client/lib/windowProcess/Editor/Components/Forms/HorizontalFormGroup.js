import React, { PropTypes, PureComponent } from 'react';
import {
  FormGroup,
  Col,
  ControlLabel
} from 'react-bootstrap';

export default class HorizontalFormGroup extends PureComponent {
  static propTypes = {
    children: PropTypes.object.isRequired,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ])
  }

  render() {
    const {
      label,
      children
    } = this.props;

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
  }
}

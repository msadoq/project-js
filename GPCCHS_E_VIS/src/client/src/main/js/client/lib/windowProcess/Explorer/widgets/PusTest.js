import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';
// import Inspector from 'react-json-inspector';

export default class PusTest extends PureComponent {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
    compare: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  initialize = () => {
    this.props.initialize('myPusId', 'myApId');
  }

  subscribe = () => {
    this.props.subscribe('myPusId', 'myApId');
  }

  unsubscribe = () => {
    this.props.unsubscribe('myPusId', 'myApId');
  }

  compare = () => {
    this.props.compare('myPusId', 'myApId', Date.now());
  }

  reset = () => {
    this.props.reset('myPusId', 'myApId', Date.now());
  }
  render() {
    return (
      <div>
        <FormGroup controlId="formHorizontal">
          <Col componentClass={ControlLabel} sm={5}>
            <strong>Test denvoi au pus acteur</strong>
          </Col>
        </FormGroup>
        <Button
          bsStyle="primary"
          block
          onClick={this.initialize}
          type="button"
        >
          Initialize
        </Button>
        <Button
          bsStyle="primary"
          block
          onClick={this.subscribe}
          type="button"
        >
          Subscribe
        </Button>
        <Button
          bsStyle="primary"
          block
          onClick={this.unsubscribe}
          type="button"
        >
          Unsubscribe
        </Button>
        <Button
          bsStyle="primary"
          block
          onClick={this.compare}
          type="button"
        >
          Compare
        </Button>
        <Button
          bsStyle="primary"
          block
          onClick={this.reset}
          type="button"
        >
          Reset
        </Button>
      </div>
    );
  }
}

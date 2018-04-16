import React, { PureComponent, PropTypes } from 'react';
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
    this.props.initialize();
  }

  subscribe = () => {
    this.props.subscribe();
  }

  unsubscribe = () => {
    this.props.unsubscribe();
  }

  compare = () => {
    this.props.compare();
  }

  reset = () => {
    this.props.reset();
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

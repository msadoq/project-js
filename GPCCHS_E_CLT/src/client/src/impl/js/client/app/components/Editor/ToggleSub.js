import React, { Component, PropTypes } from 'react';
import { FormControl, Col, Row, Button, Checkbox } from 'react-bootstrap';
import { subscriptionsStub } from './subscriptions-stub';
import _ from 'lodash';

export default class ToggleSub extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    configuration: PropTypes.object.isRequired,
    requestSub: PropTypes.func.isRequired,
  };
  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  };
  constructor(...args) {
    super(...args);
    this.state = {
      subType: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      subType: subscriptionsStub[event.target.value],
    });
  }
  handleSubmit() {
    if (this.state.subType) {
      this.props.requestSub(this.state.subType);
    }
  }
  render() {
    const { views } = this.context.store.getState();
    const view = views[this.props.viewId];
    let message = 'Editor';
    if (view.waiting) message = message.concat(' (fetching data)');
    return (
      <Col>
        {view.title} {message}
        <Row>
          <FormControl
            componentClass="select"
            placeholder="select"
            defaultValue=""
            onChange={this.handleChange}
          >
            <option key="" value={null}>{' '}</option>
            {_.map(subscriptionsStub, (v, k) =>
              <option key={k} value={k}>
                {k}
              </option>
            )}
          </FormControl>
          <Button
            onClick={this.handleSubmit}
          >
          Add Sub
          </Button>
        </Row>
        {_.map(view.subscriptions, (v, k) => {
          const visible = view.visible.includes(v);
          return (
            <Checkbox
              key={k}
              checked={visible}
              onChange={() => console.log('change', v)}
            >
              {v}
            </Checkbox>
          );
        })}
      </Col>
    );
  }
}

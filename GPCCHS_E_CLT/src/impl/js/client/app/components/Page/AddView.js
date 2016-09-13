import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import styles from './AddView.css';
import _ from 'lodash';

export default class AddView extends Component {
  static propTypes = {
    mountView: PropTypes.func.isRequired,
  };
  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  };
  constructor(...args) {
    super(...args);
    this.state = {
      viewId: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      viewId: event.target.value,
    });
  }
  handleSubmit() {
    if (this.state.viewId) {
      this.props.mountView(this.state.viewId);
    }
  }
  render() {
    const { views } = this.context.store.getState();
    return (
      <Form inline className={styles['add-view']}>
        <FormGroup controlId="addAView">
          <ControlLabel>
            add a view
          </ControlLabel>
          {' '}
          <FormControl
            componentClass="select"
            placeholder="select"
            defaultValue=""
            onChange={this.handleChange}
          >
            <option key="" value={null}>{' '}</option>
            {_.map(views, (v, k) =>
              <option key={k} value={k}>
                {v.title}
              </option>
            )}
          </FormControl>
        </FormGroup>
        {' '}
        <Button onClick={this.handleSubmit}>Add</Button>
      </Form>
    );
  }
}

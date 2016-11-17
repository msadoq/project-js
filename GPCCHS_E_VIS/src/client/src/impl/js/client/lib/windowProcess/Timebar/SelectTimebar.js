import React, { Component } from 'react';
import { Col, FormGroup } from 'react-bootstrap';

export default class SelectTimebar extends Component {

  static propTypes = {
    timebars: React.PropTypes.object.isRequired,
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.timebarsSelect.value);
  }

  render() {
    const { timebars } = this.props;
    return (
      <div>
        <Col xs={12}>
          <h4>Select a timebar</h4>
          <form onSubmit={this.onSubmit} className="form-horizontal" style={{ maxWidth: '200px', width: '95%' }}>
            <FormGroup>
              <select
                ref={(el) => { this.timebarsSelect = el; }}
                className={'form-control'}
              >
                { Object.values(timebars).map(
                  (v, i) => <option key={i} value={v.id}>{v.id}</option>
                ) }
              </select>
            </FormGroup>
            <FormGroup>
              <input type="submit" className="btn btn-primary" value="Ok" />
            </FormGroup>
          </form>
        </Col>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { Col, FormGroup } from 'react-bootstrap';

export default class SelectTimebar extends Component {

  static propTypes = {
    updateTimebarIdAction: React.PropTypes.func,
    timebars: React.PropTypes.object.isRequired,
    focusedPageId: React.PropTypes.string,
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.updateTimebarIdAction(this.props.focusedPageId, this.timebarsSelect.value);
  }

  render() {
    const { timebars } = this.props;
    return (
      <div>
        <Col xs={12}>
          <h4>Select a timebar</h4>
          <form onSubmit={this.onSubmit} className="form-horizontal col-xs-12" style={{ maxWidth: '200px', width: '95%' }}>
            <FormGroup>
              <select
                ref={(el) => { this.timebarsSelect = el; }}
                className={'form-control'}
              >
                { Object.entries(timebars).map(
                  (v, i) => <option key={i} value={v[0]}>{v[1].id}</option>
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

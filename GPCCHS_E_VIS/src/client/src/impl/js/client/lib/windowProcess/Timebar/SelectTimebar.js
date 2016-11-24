import React, { Component } from 'react';
import { v4 } from 'node-uuid';
import { Col, FormGroup } from 'react-bootstrap';

export default class SelectTimebar extends Component {

  static propTypes = {
    updateTimebar: React.PropTypes.func.isRequired,
    addTimebar: React.PropTypes.func.isRequired,
    timebars: React.PropTypes.object.isRequired,
    focusedPageId: React.PropTypes.string,
  }

  state = { form: 'select' }

  onSelect = (e) => {
    e.preventDefault();
    this.props.updateTimebar(this.props.focusedPageId, this.timebarsSelect.value);
  }

  onCreate = (e) => {
    e.preventDefault();
    const { addTimebar } = this.props;
    addTimebar(v4(), { id: this.timebarId.value });
    this.switchForm();
  }

  switchForm = (e) => {
    if (e) e.preventDefault();
    const { form } = this.state;
    this.setState({
      form: form === 'select' ? 'create' : 'select'
    });
  }

  render() {
    const { timebars } = this.props;
    const { form } = this.state;

    return (
      <div>
        <Col xs={12}>
          <Col xs={4} className={form === 'create' ? 'hidden' : ''}>
            <h4>Select a timebar</h4>
            <form onSubmit={this.onSelect} className="form-horizontal" style={{ maxWidth: '200px', width: '95%' }}>
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
                <input type="submit" className="btn btn-primary" value="Select" />
                {' '}
                <button className="btn btn-info" onClick={this.switchForm}>Create a timebar</button>
              </FormGroup>
            </form>
          </Col>
          <Col xs={4} className={form === 'select' ? 'hidden' : ''}>
            <h4>Create a timebar</h4>
            <form onSubmit={this.onCreate} className="form-horizontal" style={{ maxWidth: '200px', width: '95%' }}>
              <FormGroup>
                <input
                  ref={(el) => { this.timebarId = el; }}
                  className={'form-control'}
                  placeholder="Timebar id"
                />
              </FormGroup>
              <FormGroup>
                <input type="submit" className="btn btn-primary" value="Create" />
                {' '}
                <button className="btn btn-info" onClick={this.switchForm}>Select a timebar</button>
              </FormGroup>
            </form>
          </Col>
        </Col>
      </div>
    );
  }
}

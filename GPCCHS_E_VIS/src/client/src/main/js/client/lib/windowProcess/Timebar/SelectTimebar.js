import React, { PureComponent, PropTypes } from 'react';
import { v4 } from 'uuid';
import { Col, FormGroup } from 'react-bootstrap';

export default class SelectTimebar extends PureComponent {

  static propTypes = {
    updateTimebarId: PropTypes.func.isRequired,
    addTimebar: PropTypes.func.isRequired,
    timebars: PropTypes.object.isRequired,
    focusedPageId: PropTypes.string,
  }

  state = { form: 'select' }

  onSelect = (e) => {
    e.preventDefault();
    this.props.updateTimebarId(
      this.props.focusedPageId,
      this.timebarsSelect.value
    );
  }

  onCreate = (e) => {
    e.preventDefault();
    this.props.addTimebar(
      v4(),
      {
        id: this.timebarUuid.value,
      }
    );
    this.switchForm();
  }

  switchForm = (e) => {
    if (e) e.preventDefault();
    this.setState({
      form: this.state.form === 'select' ? 'create' : 'select',
    });
  }

  render() {
    const { timebars } = this.props;
    const { form } = this.state;
    const { focusedPageId } = this.props;
    if (!focusedPageId) {
      return null;
    }

    return (
      <div>
        <Col xs={12}>
          <Col xs={4} className={form === 'create' ? 'hidden' : ''}>
            <h4>Select a timebar</h4>
            <form onSubmit={this.onSelect} className="form-horizontal" style={{ maxWidth: '200px', width: '95%' }}>
              <FormGroup>
                <select
                  ref={(el) => { this.timebarsSelect = el; }}
                  className="form-control"
                >
                  {
                    Object.entries(timebars).map(
                      v => (
                        <option key={v[1].id} value={v[0]}>
                          {v[1].id}
                        </option>
                      )
                    )
                  }
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
                  ref={(el) => { this.timebarUuid = el; }}
                  className="form-control"
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

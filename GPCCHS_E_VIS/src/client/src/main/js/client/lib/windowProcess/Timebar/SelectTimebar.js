import React, { PureComponent, PropTypes } from 'react';
import { Col, FormGroup, Alert } from 'react-bootstrap';

export default class SelectTimebar extends PureComponent {

  static propTypes = {
    updateTimebarId: PropTypes.func.isRequired,
    createNewTimebar: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    timebars: PropTypes.object.isRequired,
    focusedPageId: PropTypes.string.isRequired,
  }

  state = {
    form: 'select',
    error: null,
  }

  onSelect = (e) => {
    e.preventDefault();
    this.props.updateTimebarId(
      this.props.focusedPageId,
      this.timebarsSelect.value
    );
  }

  onChange = (e) => {
    const { timebars } = this.props;
    if (Object.keys(timebars).find(k => timebars[k].id === e.currentTarget.value)) {
      this.setState({
        error: 'This timebar name is already taken',
      });
    } else {
      this.setState({
        error: null,
      });
    }
  }

  onCreate = (e) => {
    e.preventDefault();
    this.props.createNewTimebar(this.timebarId.value);
    this.switchForm();
  }

  switchForm = (e) => {
    if (e) e.preventDefault();
    this.setState({
      form: this.state.form === 'select' ? 'create' : 'select',
    });
  }

  render() {
    const {
      timebars,
      focusedPageId,
    } = this.props;
    const {
      form,
      error,
    } = this.state;

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
                    Object.keys(timebars).map(
                      key => (
                        <option key={timebars[key].id} value={key}>
                          {timebars[key].id}
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
                { error && <Alert bsStyle="danger">{ error }</Alert> }
                <input
                  ref={(el) => { this.timebarId = el; }}
                  onChange={this.onChange}
                  className="form-control"
                  placeholder="Timebar name"
                />
              </FormGroup>
              <FormGroup>
                <input disabled={!!error} type="submit" className="btn btn-primary" value="Create" />
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

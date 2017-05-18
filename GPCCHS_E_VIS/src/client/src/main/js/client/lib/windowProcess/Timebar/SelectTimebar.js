import React, { PureComponent, PropTypes } from 'react';
import { FormGroup, Alert } from 'react-bootstrap';

export default class SelectTimebar extends PureComponent {

  static propTypes = {
    mountPageTimebar: PropTypes.func.isRequired,
    createNewTimebar: PropTypes.func.isRequired,
    timebars: PropTypes.shape().isRequired,
    pageId: PropTypes.string.isRequired,
  }

  state = {
    form: 'select',
    error: null,
  }

  onSelect = (e) => {
    e.preventDefault();
    this.props.mountPageTimebar(
      this.props.pageId,
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
      pageId,
    } = this.props;
    const {
      form,
      error,
    } = this.state;

    if (!pageId) {
      return null;
    }

    return (
      <div>
        <div className={form === 'create' ? 'hidden' : 'p10'}>
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
        </div>
        <div className={form === 'select' ? 'hidden' : 'p10'}>
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
        </div>
      </div>
    );
  }
}

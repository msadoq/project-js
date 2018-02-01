// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Removed Object.entries -> Object.keys . Removed unecessary prop.
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Can not create timebar with same id.
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Replace WS_TIMEBAR_ADD by WS_TIMEBAR_CREATE_NEW .
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Style revision of SelectTimebar form.
// VERSION : 1.1.2 : DM : #6302 : 06/04/2017 : Fix some lint errors, added justification and DV6 TBC_CNES prefix on others.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : Timebar creation : timebar is created with uuid attribute.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import { FormGroup, Alert } from 'react-bootstrap';
import _difference from 'lodash/difference';

const { func, shape, string } = PropTypes;

export default class SelectTimebar extends PureComponent {

  static propTypes = {
    mountPageTimebar: func.isRequired,
    createNewTimebar: func.isRequired,
    timebars: shape().isRequired,
    pageId: string.isRequired,
  };
  state = {
    form: 'select',
    error: null,
  };
  /**
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    // timebars has changed. forced to do it here, dispatch (in onCreate) is asynchronous
    if (nextProps.timebars !== this.props.timebars) {
      const diff = _difference(Object.keys(nextProps.timebars), Object.keys(this.props.timebars));
      // only one more, and this one is the new created one
      if (diff.length === 1 && nextProps.timebars[diff[0]].id === this.timebarId.value) {
        // just mount it
        this.props.mountPageTimebar(
          this.props.pageId,
          diff[0]
        );
      }
    }
  }
  onSelect = (e) => {
    e.preventDefault();
    this.props.mountPageTimebar(
      this.props.pageId,
      this.timebarsSelect.value
    );
  };
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
  };
  onCreate = (e) => {
    e.preventDefault();
    this.props.createNewTimebar(this.timebarId.value);
  };
  switchForm = (e) => {
    if (e) e.preventDefault();
    this.setState({
      form: this.state.form === 'select' ? 'create' : 'select',
    });
  };
  assignTimebarId = (el) => { this.timebarId = el; };
  assignTimebarSelect = (el) => { this.timebarsSelect = el; };
  render() {
    if (!this.props.pageId) {
      return null;
    }

    return (
      <div>
        <TimebarCreation
          form={this.state.form}
          timebars={this.props.timebars}
          onSelect={this.onSelect}
          switchForm={this.switchForm}
          assignTimebarSelect={this.assignTimebarSelect}
        />
        <TimebarSelection
          form={this.state.form}
          error={this.state.error}
          onCreate={this.onCreate}
          onChange={this.onChange}
          switchForm={this.switchForm}
          assignTimebarId={this.assignTimebarId}
        />
      </div>
    );
  }
}

/**
 * @param form
 * @param timebars
 * @param onSelect
 * @param switchForm
 * @param assignTimebarSelect
 * @returns {*}
 * @constructor
 */
export const TimebarCreation = ({
  form,
  timebars,
  onSelect,
  switchForm,
  assignTimebarSelect,
}) => (
  <div className={form === 'create' ? 'hidden' : 'p10'}>
    <h4>Select a timebar</h4>
    <form onSubmit={onSelect} className="form-horizontal" style={{ maxWidth: '200px', width: '95%' }}>
      <FormGroup>
        <select
          ref={assignTimebarSelect}
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
        <button className="btn btn-info" onClick={switchForm}>Create a timebar</button>
      </FormGroup>
    </form>
  </div>
);
TimebarCreation.propTypes = {
  form: string.isRequired,
  timebars: shape().isRequired,
  onSelect: func.isRequired,
  switchForm: func.isRequired,
  assignTimebarSelect: func.isRequired,
};

export const TimebarSelection = ({
  form,
  error,
  onCreate,
  onChange,
  switchForm,
  assignTimebarId,
}) => (
  <div className={form === 'select' ? 'hidden' : 'p10'}>
    <h4>Create a timebar</h4>
    <form onSubmit={onCreate} className="form-horizontal" style={{ maxWidth: '200px', width: '95%' }}>
      <FormGroup>
        { error && <Alert bsStyle="danger">{ error }</Alert> }
        <input
          ref={assignTimebarId}
          onChange={onChange}
          className="form-control"
          placeholder="Timebar name"
        />
      </FormGroup>
      <FormGroup>
        <input disabled={!!error} type="submit" className="btn btn-primary" value="Create" />
        {' '}
        <button className="btn btn-info" onClick={switchForm}>Select a timebar</button>
      </FormGroup>
    </form>
  </div>
);
TimebarSelection.propTypes = {
  form: string.isRequired,
  error: string,
  onCreate: func.isRequired,
  onChange: func.isRequired,
  switchForm: func.isRequired,
  assignTimebarId: func.isRequired,
};
TimebarSelection.defaultProps = {
  error: null,
};

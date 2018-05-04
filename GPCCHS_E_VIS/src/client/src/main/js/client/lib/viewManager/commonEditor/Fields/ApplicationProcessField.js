import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import _map from 'lodash/map';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import InputField from 'windowProcess/commonReduxForm/InputField';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import { applicationProcessesType } from 'viewManager/common/Components/types';
import './ApplicationProcessField.scss';

const { func, string, number } = PropTypes;

export default class ApplicationProcessField extends PureComponent {
  static propTypes = {
    onChange: func,
    timelineId: string,
    // from container mapStateToProps
    applicationProcesses: applicationProcessesType,
    domainId: number,
    sessionId: number,
    // from container mapDispatchToProps
    askApids: func.isRequired,
  };

  static defaultProps = {
    onChange: null,
    applicationProcesses: null,
    applicationProcess: null,
    sessionId: null,
    domainId: null,
    timelineId: null,
  };

  componentDidMount() {
    this.requestApids(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.requestApids(nextProps);
  }

  requestApids = (props) => {
    const { domainId, timelineId, sessionId, applicationProcesses, askApids } = props;
    if (!!(domainId && timelineId) && applicationProcesses === null) {
      askApids(domainId, sessionId);
    }
  };

  render() {
    const { domainId, timelineId } = this.props;
    const disabled = (!domainId || !timelineId);
    const applicationProcessOptions = _map(this.props.applicationProcesses, ap => ({
      name: ap.apidName,
    }));

    return (
      <div className="row mr0">
        <Field
          format={null}
          name="connectedData.apidName"
          component={ReactSelectField}
          options={computeOptions(applicationProcessOptions, false)}
          className="col-xs-8"
          onChange={this.props.onChange}
          disabled={disabled}
        />
        <Field
          format={null}
          name="connectedData.apidRawValue"
          component={InputField}
          clearable
          type="text"
          className="col-xs-4 inputField"
          onChange={this.props.onChange}
          disabled={disabled}
        />
      </div>
    );
  }
}

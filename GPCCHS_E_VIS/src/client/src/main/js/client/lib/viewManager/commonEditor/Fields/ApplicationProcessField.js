import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import _map from 'lodash/map';
import _find from 'lodash/find';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import InputField from 'windowProcess/commonReduxForm/InputField';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import { applicationProcessesType } from 'viewManager/common/Components/types';
import './ApplicationProcessField.scss';

const { func, number } = PropTypes;

export default class ApplicationProcessField extends PureComponent {
  static propTypes = {
    onChange: func,
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
  };

  state = {
    apidRawValue: null,
  };

  componentDidMount() {
    this.requestApids(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.requestApids(nextProps);
  }

  requestApids = (props) => {
    const { domainId, sessionId, applicationProcesses, askApids } = props;
    if (!!(domainId && sessionId) && applicationProcesses === null) {
      askApids(domainId, sessionId);
    }
  };

  handleChange = (event, newValue) => {
    const apid = findAPID(this.props.applicationProcesses, newValue);
    this.setState({ apidRawValue: apid.apidRawValue });
    this.props.onChange(apid.apidRawValue, 'connectedData.apidRawValue');
  };

  render() {
    const { domainId, sessionId } = this.props;
    const disabled = (!domainId || !sessionId);
    const applicationProcessOptions = _map(this.props.applicationProcesses, ap => ({
      name: ap.apidName,
    }));

    return (
      <div className="row mr0 applicationProcess">
        <Field
          format={null}
          name="connectedData.apidName"
          component={ReactSelectField}
          options={computeOptions(applicationProcessOptions, false)}
          className="col-xs-8"
          onChange={this.handleChange}
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
          disabled
          value={this.state.apidRawValue}
        />
      </div>
    );
  }
}

export const findAPID = (applicationProcesses, apidName) =>
  _find(applicationProcesses, apid => apid.apidName === apidName
);

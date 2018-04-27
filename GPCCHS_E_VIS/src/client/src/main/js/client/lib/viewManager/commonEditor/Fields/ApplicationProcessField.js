import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import InputField from 'windowProcess/commonReduxForm/InputField';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import { applicationProcessesType } from 'viewManager/common/Components/types';
import './ApplicationProcessField.scss';

const { func, string } = PropTypes;

export default class ApplicationProcessField extends PureComponent {
  static propTypes = {
    onChange: func,
    selectFieldName: string,
    inputFieldName: string,
    // from container mapStateToProps
    applicationProcesses: applicationProcessesType.isRequired,
  };

  static defaultProps = {
    onChange: null,
    selectFieldName: 'connectedData.applicationProcess.name',
    inputFieldName: 'connectedData.applicationProcess.APId',
  };

  render() {
    return (
      <div className="row">
        <Field
          format={null}
          name={this.props.selectFieldName}
          component={ReactSelectField}
          options={computeOptions(this.props.applicationProcesses, false)}
          className="col-xs-8"
          onChange={this.props.onChange}
        />
        <Field
          format={null}
          name={this.props.inputFieldName}
          component={InputField}
          clearable
          type="text"
          className="col-xs-4 inputField"
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

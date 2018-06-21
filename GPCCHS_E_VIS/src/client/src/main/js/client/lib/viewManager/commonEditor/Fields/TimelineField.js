import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import { timelinesType } from 'viewManager/common/Components/types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

export default class TimelineField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    // from container mapStateToProps
    timelines: timelinesType.isRequired,
  };

  static defaultProps = {
    onChange: null,
    name: 'connectedData.timeline',
  };

  render() {
    return (
      <ErrorBoundary>
        <Field
          format={null}
          name={this.props.name}
          component={ReactSelectField}
          clearable
          options={computeOptions(this.props.timelines, true)}
          onChange={this.props.onChange}
        />
      </ErrorBoundary>
    );
  }
}

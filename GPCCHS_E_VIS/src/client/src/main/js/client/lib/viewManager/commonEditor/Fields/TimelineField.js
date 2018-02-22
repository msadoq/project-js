import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import { timelinesType } from './types';

const { func, string } = PropTypes;

export default class TimelineField extends PureComponent {
  static propTypes = {
    onChange: func,
    name: string,
    // from container mapStateToProps
    timelines: timelinesType.isRequired,
  };

  static defaultProps = {
    onChange: null,
    name: 'timeline',
  };

  render() {
    return (
      <div>
        <Field
          format={null}
          name={this.props.name}
          component={ReactSelectField}
          clearable
          options={computeOptions(this.props.timelines, true)}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

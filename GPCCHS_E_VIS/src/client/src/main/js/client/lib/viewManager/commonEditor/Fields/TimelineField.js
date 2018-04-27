import React, { PropTypes, PureComponent } from 'react';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import { timelinesType } from '../../common/Components/types';

const { func } = PropTypes;

export default class TimelineField extends PureComponent {
  static propTypes = {
    onChange: func,
    // from container mapStateToProps
    timelines: timelinesType.isRequired,
  };

  static defaultProps = {
    onChange: null,
  };

  render() {
    return (
      <div>
        <Field
          format={null}
          name="timeline"
          component={ReactSelectField}
          clearable
          options={computeOptions(this.props.timelines, true)}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

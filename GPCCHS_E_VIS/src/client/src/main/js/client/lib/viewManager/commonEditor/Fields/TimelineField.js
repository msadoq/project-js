import React, { PropTypes, PureComponent } from 'react';
import { Field } from 'redux-form';
import ReactSelectField from '../../../windowProcess/commonReduxForm/ReactSelectField';
import { timelinesType } from './types';

const { string } = PropTypes;

export default class TimelineField extends PureComponent {
  static propTypes = {
    timelines: timelinesType.isRequired,
    timelineName: string,
  };

  static defaultProps = {
    timelineName: null,
  };

  state = {
    timeline: null,
  };

  newTimeline = (timeline) => {
    this.setState({ timeline });
  };

  render() {
    const { timelines, timelineName } = this.props;
    const { timeline } = this.state;

    return (
      <div>
        <Field
          name="timeline"
          component={ReactSelectField}
          onInputChange={this.newTimeline}
          clearable={false}
          options={computeTimelineFieldOptions(timelines, timeline, timelineName)}
        />
      </div>
    );
  }
}

/**
 * @param timelines
 * @param timeline
 * @param timelineName
 */
export const computeTimelineFieldOptions = (timelines, timeline, timelineName) => {
  let options = timelines.map(d =>
    ({
      label: d.id,
      value: d.id,
    })
  );
  options = options.concat(
    timeline && !options.find(s => s.value === timeline)
      ? { label: timeline, value: timeline }
      : []
  );
  options = options.concat(
    timelineName && !options.find(s => s.value === timelineName)
      ? { label: timelineName, value: timelineName }
      : []
  );
  options = options.concat({
    label: '*',
    value: '*',
  });

  return options;
};

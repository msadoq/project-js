import React, { PropTypes } from 'react';
import _ from 'lodash/fp';
import Select from 'react-select';

import { when } from '../../../../../common/fp';
import { get } from '../../../../../common/configurationManager';

const isFalsy = x => !x;
const wildcard = get('WILDCARD_CHARACTER');

class TimelineFilter extends React.Component {
  handleOnChange = change => _.compose(
    this.props.updateTimeline,
    when(isFalsy, _.always(wildcard)),
    _.get('value')
  )(change)

  render() {
    const { timeline, availableTimelines } = this.props;
    const options = _.uniqBy('value', [
      { value: wildcard, label: wildcard },
      { value: timeline, label: timeline },
      ...availableTimelines.map(({ id }) => ({ value: id, label: id })),
    ]);
    return (
      <span>
        Domain
        <Select.Creatable
          clearable={timeline !== wildcard}
          options={options}
          value={timeline}
          promptTextCreator={x => `Filter by timeline: '${x}'`}
          onChange={this.handleOnChange}
        />
      </span>
    );
  }
}
TimelineFilter.propTypes = {
  timeline: PropTypes.string.isRequired,
  availableTimelines: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  updateTimeline: PropTypes.func.isRequired,
};

export default TimelineFilter;

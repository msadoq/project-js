import _ from 'lodash/fp';

const getDefaultView = _.merge({
  type: 'GroundAlarmView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'New Ground Alarm View',
  configuration: {
    domain: '',
    timeline: '',
  },
});

export default _.pipe(
    getDefaultView
);

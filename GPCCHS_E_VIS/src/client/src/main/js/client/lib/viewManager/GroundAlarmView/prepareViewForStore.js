import _ from 'lodash/fp';

const getDefaultView = _.merge({
  type: 'GroundAlarmView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'New Ground Alarm View',
  configuration: {
    alarmDomain: '*',
    alarmTimeline: '*',
    alarmMode: 'ALL',
  },
});

export default _.pipe(
    getDefaultView
);

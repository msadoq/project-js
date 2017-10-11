import _ from 'lodash/fp';
import { get } from '../../common/configurationManager';
import * as constants from '../../constants';

const getDefaultView = view => _.merge({
  type: 'GroundAlarmView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'New Ground Alarm View',
  configuration: {
    alarmDomain: get('WILDCARD_CHARACTER'),
    alarmTimeline: get('WILDCARD_CHARACTER'),
    alarmMode: constants.ALARM_MODE_ALL,
  },
}, view);

export default _.pipe(
  getDefaultView
);

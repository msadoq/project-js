import { v4 } from 'uuid';
import { get } from '../../common/configurationManager';
import { getStateColorFilters } from '../../windowProcess/common/colors';
import constants from '../../constants';

export default function (entryPoint) {
  return Object.assign({}, getNewGroundAlarmEntryPoint(), entryPoint);
}

const getNewGroundAlarmEntryPoint = () => ({
  name: 'groundAlarmEP',
  id: v4(),
  connectedData: {
    mode: constants.ALARM_MODE_ALL,
    domain: get('WILDCARD_CHARACTER'),
    timeline: get('WILDCARD_CHARACTER'),
  },
  stateColors: getStateColorFilters(),
});

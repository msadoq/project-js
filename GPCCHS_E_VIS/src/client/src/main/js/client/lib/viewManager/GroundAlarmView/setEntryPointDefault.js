import { v4 } from 'uuid';
import { get } from 'common/configurationManager';
import constants from 'constants';
import { applyDefaultValues } from 'utils/views';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewGroundAlarmEntryPoint());
}

const getNewGroundAlarmEntryPoint = () => ({
  name: 'groundAlarmEP',
  id: v4(),
  connectedData: {
    mode: constants.ALARM_MODE_ALL,
    domain: get('WILDCARD_CHARACTER'),
    timeline: get('WILDCARD_CHARACTER'),
  },
  stateColors: [],
});

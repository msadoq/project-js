import { v4 } from 'uuid';
import { get } from 'common/configurationManager';
import constants from 'constants';
import { applyDefaultValues } from 'utils/views';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewOnboardAlarmEntryPoint());
}

const getNewOnboardAlarmEntryPoint = () => ({
  id: v4(),
  name: 'onboardAlarmEP',
  connectedData: {
    mode: constants.ALARM_MODE_ALL,
    domain: get('WILDCARD_CHARACTER'),
    timeline: get('WILDCARD_CHARACTER'),
  },
  stateColors: [],
});

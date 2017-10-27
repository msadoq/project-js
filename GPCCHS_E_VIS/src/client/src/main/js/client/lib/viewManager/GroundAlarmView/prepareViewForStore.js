import _ from 'lodash/fp';
import { v4 } from 'uuid';
import { get } from '../../common/configurationManager';
import * as constants from '../../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: 'GroundAlarmView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'New Ground Alarm View',
  configuration: {
    entryPoint: {
      name: 'groundAlarmEP',
      connectedData: {
        domain: get('WILDCARD_CHARACTER'),
        timeline: get('WILDCARD_CHARACTER'),
        mode: constants.GMA_ALARM_MODE_ALL,
      },
    },
  },
}, view);

export default _.pipe(
  getDefaultView,
  _.update('configuration', _.pipe(
    _.update('entryPoint.id', v4),
    moveProp('entryPoint', 'entryPoints'),
    _.update('entryPoints', singleton)
  ))
);

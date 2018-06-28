import _ from 'lodash/fp';
import { VM_VIEW_PUS11 } from '../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS11,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'On-Board Scheduling Service Ground Model (PUS11)',
  titleStyle: {
    align: 'left',
    bold: false,
    color: '#000000',
    font: 'Arial',
    italic: false,
    size: 12,
    strikeOut: false,
    underline: false,
  },
  configuration: {
    entryPoint: {},
    tables: {
      subSchedules: {
        name: 'Sub schedules',
        sorting: {
          colName: 'referenceTimestamp',
          direction: 'DESC',
        },
        cols: [
          { title: 'ssid', displayed: true },
          { title: 'apid', displayed: true },
          { title: 'name', displayed: true },
          { title: 'status', displayed: true },
          { title: 'firstTCTime', displayed: true },
        ],
      },
      enabledApids: {
        name: 'Enabled APIDs',
        cols: [
          { title: 'apid', displayed: true },
          { title: 'name', displayed: true },
        ],
      },
      commands: {
        name: 'Commands',
        cols: [
          { title: 'apid', displayed: true },
          { title: 'ssid', displayed: true },
          { title: 'cmdName', displayed: true },
          { title: 'cmdDescription', displayed: true },
          { title: 'cmdApName', displayed: true },
          { title: 'seqCount', displayed: true },
          { title: 'sourceId', displayed: true },
          { title: 'cmdStatus', displayed: true },
          { title: 'groundStatus', displayed: true },
          { title: 'initExecTime', displayed: true },
          { title: 'curExecTime', displayed: true },
          { title: 'toShiftTime', displayed: true },
        ],
      },
    },
  },
}, view);

export default _.pipe(
  getDefaultView,
  _.update('configuration', _.pipe(
    moveProp('entryPoint', 'entryPoints'),
    _.update('entryPoints', singleton)
  ))
);

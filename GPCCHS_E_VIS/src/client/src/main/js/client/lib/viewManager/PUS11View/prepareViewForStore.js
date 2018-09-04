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
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID Name', title: 'serviceApidName', tooltip: 'serviceApidName', displayed: true },
          { label: 'SSID', title: 'ssId', tooltip: 'ssId', displayed: true },
          { label: 'SSID Label', title: 'ssIdLabel', tooltip: 'ssIdLabel', displayed: true },
          { label: 'Status', title: 'status', tooltip: 'status', displayed: true },
          { label: 'First TC Time', title: 'executionTimeFirstTc', tooltip: 'executionTimeFirstTc', displayed: true },
        ],
      },
      enabledApids: {
        name: 'Enabled APIDs',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'Apid Name', title: 'serviceApidName', tooltip: 'serviceApidName', displayed: true },
          { label: 'APID', title: 'apid', tooltip: 'apid', displayed: true },
          { label: 'Name', title: 'apidName', tooltip: 'apidName', displayed: true },
          { label: 'Update Type', title: 'lastUpdateModeApid', tooltip: 'lastUpdateModeApid', displayed: true },
          { label: 'Update Time', title: 'lastUpdateTimeApid', tooltip: 'lastUpdateTimeApid', displayed: true },
        ],
      },
      commands: {
        name: 'Commands',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'Apid Name', title: 'serviceApidName', tooltip: 'serviceApidName', displayed: true },
          { label: 'SSID', title: 'commandSsId', tooltip: 'commandSsId', displayed: true },
          { label: 'Cmd. Name', title: 'commandName', tooltip: 'commandName', displayed: true },
          { label: 'Cmd. Short Description', title: 'commandDescription', tooltip: 'commandDescription', displayed: true },
          { label: 'Cmd. AP Name', title: 'commandApidName', tooltip: 'commandApidName', displayed: true },
          { label: 'Seq. Count', title: 'commandSequenceCount', tooltip: 'commandSequenceCount', displayed: true },
          { label: 'Source ID', title: 'commandSourceId', tooltip: 'commandSourceId', displayed: true },
          { label: 'Cmd. Status', title: 'commandStatus', tooltip: 'commandStatus', displayed: true },
          { label: 'Ground Status', title: 'commandGroundStatus', tooltip: 'commandGroundStatus', displayed: true },
          { label: 'Init. Exec. Time', title: 'initialExecutionTime', tooltip: 'initialExecutionTime', displayed: true },
          { label: 'Cur. Exec. Time', title: 'currentExecutionTime', tooltip: 'currentExecutionTime', displayed: true },
          { label: 'Tot. Time Shift', title: 'totalTimeShiftOffset', tooltip: 'totalTimeShiftOffset', displayed: true },
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

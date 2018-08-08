import _ from 'lodash/fp';
import { VM_VIEW_PUS05 } from '../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS05,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'On-Board Events (PUS05)',
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
      onBoardEvents: {
        name: 'On-Board Events',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID Name', title: 'serviceApidName', displayed: true },
          { label: 'RID', title: 'rid', displayed: true },
          { label: 'RID Label', title: 'ridLabel', displayed: true },
          { label: 'Name', title: 'reportName', displayed: true },
          { label: 'Status', title: 'onBoardStatus', displayed: true },
          { label: 'Event Short Description', title: 'reportShortDescription', displayed: true },
          { label: 'Event Default Status', title: 'defaultOnBoardStatus', displayed: true },
          { label: 'Alarm Level', title: 'alarmLevel', displayed: true },
          { label: 'Action Name', title: 'actionName', displayed: true },
          { label: 'Event Long Description', title: 'reportLongDescription', displayed: true },
        ],
      },
      received: {
        name: 'Received On-Board Events',
        sorting: {
          colName: 'apid',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID', title: 'apid', displayed: true },
          { label: 'Report ID', title: 'reportId', displayed: true },
          { label: 'Report Name', title: 'reportName', displayed: true },
          { label: 'Event Type', title: 'eventType', displayed: true },
          { label: 'Alarm Lvl', title: 'alarmLevel', displayed: true },
          { label: 'OnBoard Date', title: 'onBoardDate', displayed: true },
          { label: 'Ground Date', title: 'groundDate', displayed: true },
          { label: 'Param 1', title: 'param1', displayed: true },
          { label: 'Param 2', title: 'param2', displayed: true },
          { label: 'Param 3', title: 'param3', displayed: true },
          { label: 'Param 4', title: 'param4', displayed: true },
          { label: 'Param 5', title: 'param5', displayed: true },
          { label: 'Param 6', title: 'param6', displayed: true },
          { label: 'Param 7', title: 'param7', displayed: true },
          { label: 'Param 8', title: 'param8', displayed: true },
          { label: 'Param 9', title: 'param9', displayed: true },
          { label: 'Param 10', title: 'param10', displayed: true },
          { label: 'Value 1', title: 'value1', displayed: true },
          { label: 'Value 2', title: 'value2', displayed: true },
          { label: 'Value 3', title: 'value3', displayed: true },
          { label: 'Value 4', title: 'value4', displayed: true },
          { label: 'Value 5', title: 'value5', displayed: true },
          { label: 'Value 6', title: 'value6', displayed: true },
          { label: 'Value 7', title: 'value7', displayed: true },
          { label: 'Value 8', title: 'value8', displayed: true },
          { label: 'Value 9', title: 'value9', displayed: true },
          { label: 'Value 10', title: 'value10', displayed: true },
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

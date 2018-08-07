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
          { title: 'serviceApidName', displayed: true },
          { title: 'rid', displayed: true },
          { title: 'ridLabel', displayed: true },
          { title: 'reportName', displayed: true },
          { title: 'onBoardStatus', displayed: true },
          { title: 'reportShortDescription', displayed: true },
          { title: 'defaultOnBoardStatus', displayed: true },
          { title: 'alarmLevel', displayed: true },
          { title: 'actionName', displayed: true },
          { title: 'reportLongDescription', displayed: true },
        ],
      },
      received: {
        name: 'Received On-Board Events',
        sorting: {
          colName: 'apid',
          direction: 'DESC',
        },
        cols: [
          { title: 'apid', displayed: true },
          { title: 'reportId', displayed: true },
          { title: 'reportName', displayed: true },
          { title: 'eventType', displayed: true },
          { title: 'alarmLevel', displayed: true },
          { title: 'onBoardDate', displayed: true },
          { title: 'groundDate', displayed: true },
          { title: 'Param 1', displayed: true },
          { title: 'Value 1', displayed: true },
          { title: 'Param 2', displayed: true },
          { title: 'Value 2', displayed: true },
          { title: 'Param 3', displayed: true },
          { title: 'Value 3', displayed: true },
          { title: 'Param 4', displayed: true },
          { title: 'Value 4', displayed: true },
          { title: 'Param 5', displayed: true },
          { title: 'Value 5', displayed: true },
          { title: 'Param 6', displayed: true },
          { title: 'Value 6', displayed: true },
          { title: 'Param 7', displayed: true },
          { title: 'Value 7', displayed: true },
          { title: 'Param 8', displayed: true },
          { title: 'Value 8', displayed: true },
          { title: 'Param 9', displayed: true },
          { title: 'Value 9', displayed: true },
          { title: 'Param 10', displayed: true },
          { title: 'Value 10', displayed: true },
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

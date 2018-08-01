import _ from 'lodash/fp';
import { VM_VIEW_PUS05 } from '../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS05,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'On-Board Scheduling Service Ground Model (PUS05)',
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
          colName: 'ssId',
          direction: 'DESC',
        },
        cols: [
          { title: 'ssId', displayed: true }, // A afficher dans le tableau SubSchedules
          { title: 'ssIdLabel', displayed: true }, // A afficher dans le tableau SubSchedules
          { title: 'serviceApidName', displayed: true }, // A afficher dans le tableau SubSchedules
          { title: 'status', displayed: true }, // constante, à récupérer dans PUS_CONSTANTS.STATUS et à afficher dans la vue. Si 3 (DELETED), supprimer l’entrée du state
          { title: 'executionTimeFirstTc', displayed: true }, // A afficher dans le tableau SubSchedules
        ],
      },
      enabledApids: {
        name: 'Enabled APIDs',
        cols: [
          { title: 'apid', displayed: true }, // à afficher dans le tableau Enabled AP
          { title: 'apidName', displayed: true }, // A afficher dans le tableau Enabled AP
          { title: 'lastUpdateModeApid', displayed: true }, // Tooltip sur apid / apidName
          { title: 'lastUpdateTimeApid', displayed: true }, // Tooltip sur apid / apidName
        ],
      },
      commands: {
        name: 'Commands',
        cols: [
          { title: 'commandSsId', displayed: true }, // A afficher dans le tableau Commands
          { title: 'commandName', displayed: true }, // A afficher dans le tableau Commands
          { title: 'commandDescription', displayed: true }, // A afficher dans le tableau Commands
          { title: 'commandApidName', displayed: true }, // A afficher dans le tableau Commands
          { title: 'commandSequenceCount', displayed: true }, // A afficher dans le tableau Commands
          { title: 'commandSourceId', displayed: true }, // A afficher dans le tableau Commands
          { title: 'commandStatus', displayed: true }, // A afficher dans le tableau Commands. Si 3 (DELETED), supprimer l’entrée du state
          { title: 'commandGroundStatus', displayed: true }, // A afficher dans le tableau Commands
          { title: 'initialExecutionTime', displayed: true }, // A afficher dans le tableau Commands
          { title: 'currentExecutionTime', displayed: true }, // A afficher dans le tableau Commands
          { title: 'totalTimeShiftOffset', displayed: true }, // A afficher dans le tableau Commands
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

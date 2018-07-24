import _ from 'lodash/fp';
import { VM_VIEW_PUS12 } from '../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS12,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 12, On-board Monitoring Service',
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
      parameterMonitoringDefinitions: {
        name: 'Parameter Monitoring Definitions',
        sorting: {
          colName: 'monitoringId',
          direction: 'DESC',
        },
        cols: [
          { title: 'monitoringId', displayed: true },
          { title: 'monitoringIdLabel', displayed: true },
          { title: 'monitoringName', displayed: true },
          { title: 'parameterId', displayed: true },
          { title: 'parameterName', displayed: true },
          { title: 'monitoringStatus', displayed: true },
          { title: 'protectionStatus', displayed: true },
          { title: 'monitoringInterval', displayed: true },
          { title: 'repetitionNumber', displayed: true },
          { title: 'checkType', displayed: true },
          { title: 'validityParameterId', displayed: true },
          { title: 'validityParameterName', displayed: true },
          { title: 'validityParameterMask', displayed: true },
          { title: 'validityParameterExpectedValue', displayed: true },
          { title: 'parameterCurrentValue', displayed: true },
          { title: 'ridEL', displayed: true },
          { title: 'ridLabelEL', displayed: true },
          { title: 'ridStatusEL', displayed: true },
          { title: 'actionStatusEL', displayed: true },
          { title: 'actionNameEL', displayed: true },
          { title: 'maskEL', displayed: true },
          { title: 'valueEL', displayed: true },
          { title: 'actionTcApidEL', displayed: true },
          { title: 'actionTcTypeEL', displayed: true },
          { title: 'actionTcSubTypeEL', displayed: true },
          { title: 'ridH', displayed: true },
          { title: 'ridLabelH', displayed: true },
          { title: 'ridStatusH', displayed: true },
          { title: 'actionStatusH', displayed: true },
          { title: 'actionNameH', displayed: true },
          { title: 'maskH', displayed: true },
          { title: 'valueH', displayed: true },
          { title: 'actionTcApidH', displayed: true },
          { title: 'actionTcTypeH', displayed: true },
          { title: 'actionTcSubTypeH', displayed: true },
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

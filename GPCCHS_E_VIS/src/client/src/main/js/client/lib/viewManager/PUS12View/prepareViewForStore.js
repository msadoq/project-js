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
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'Apid Name', title: 'serviceApidName', tooltip: 'serviceApidName', displayed: true },
          { label: 'MID', title: 'monitoringId', tooltip: 'monitoringId', displayed: true },
          { label: 'MID Label', title: 'monitoringIdLabel', tooltip: 'monitoringIdLabel', displayed: true },
          { label: 'Monit. Name', title: 'monitoringName', tooltip: 'monitoringName', displayed: true },
          { label: 'Param. ID', title: 'parameterId', tooltip: 'parameterId', displayed: true },
          { label: 'Param. Name', title: 'parameterName', tooltip: 'parameterName', displayed: true },
          { label: 'Monit. Status', title: 'monitoringStatus', tooltip: 'monitoringStatus', displayed: true },
          { label: 'Protect. Status', title: 'protectionStatus', tooltip: 'protectionStatus', displayed: true },
          { label: 'Interval', title: 'monitoringInterval', tooltip: 'monitoringInterval', displayed: true },
          { label: 'Rep. Number', title: 'repetitionNumber', tooltip: 'repetitionNumber', displayed: true },
          { label: 'Check Type', title: 'checkType', tooltip: 'checkType', displayed: true },
          { label: 'Val. Param. ID', title: 'validityParameterId', tooltip: 'validityParameterId', displayed: true },
          { label: 'Val. Param. Name', title: 'validityParameterName', tooltip: 'validityParameterName', displayed: true },
          { label: 'Val. Param. Mask', title: 'validityParameterMask', tooltip: 'validityParameterMask', displayed: true },
          { label: 'Val. Exp. Value', title: 'validityParameterExpectedValue', tooltip: 'validityParameterExpectedValue', displayed: true },
          { label: 'RID-EL', title: 'ridEL', tooltip: 'ridEL', displayed: true },
          { label: 'RID-EL Label', title: 'ridLabelEL', tooltip: 'ridLabelEL', displayed: true },
          { label: 'Status EL', title: 'ridStatusEL', tooltip: 'ridStatusEL', displayed: true },
          { label: 'Action Status EL', title: 'actionStatusEL', tooltip: 'actionStatusEL', displayed: true },
          { label: 'Action EL', title: 'actionNameEL', tooltip: 'actionNameEL', displayed: true },
          { label: 'Action Mask EL', title: 'maskEL', tooltip: 'maskEL', displayed: true },
          { label: 'Value EL', title: 'valueEL', tooltip: 'valueEL', displayed: true },
          { label: 'Action EL TC Apid', title: 'actionTcApidEL', tooltip: 'actionTcApidEL', displayed: true },
          { label: 'Action EL TC Type', title: 'actionTcTypeEL', tooltip: 'actionTcTypeEL', displayed: true },
          { label: 'Action EL TC Subtype', title: 'actionTcSubTypeEL', tooltip: 'actionTcSubTypeEL', displayed: true },
          { label: 'RID-H', title: 'ridH', tooltip: 'ridH', displayed: true },
          { label: 'RID-H Label', title: 'ridLabelH', tooltip: 'ridLabelH', displayed: true },
          { label: 'Status H', title: 'ridStatusH', tooltip: 'ridStatusH', displayed: true },
          { label: 'Action Status H', title: 'actionStatusH', tooltip: 'actionStatusH', displayed: true },
          { label: 'Action H', title: 'actionNameH', tooltip: 'actionNameH', displayed: true },
          { label: 'Action Mask H', title: 'maskH', tooltip: 'maskH', displayed: true },
          { label: 'Value H', title: 'valueH', tooltip: 'valueH', displayed: true },
          { label: 'Action H TC Apid', title: 'actionTcApidH', tooltip: 'actionTcApidH', displayed: true },
          { label: 'Action H TC Type', title: 'actionTcTypeH', tooltip: 'actionTcTypeH', displayed: true },
          { label: 'Action H TC Subtype', title: 'actionTcSubTypeH', tooltip: 'actionTcSubTypeH', displayed: true },
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

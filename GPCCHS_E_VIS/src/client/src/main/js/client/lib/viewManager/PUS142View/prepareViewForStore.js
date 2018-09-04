import _ from 'lodash/fp';
import { VM_VIEW_PUS142 } from '../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS142,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 142,',
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
      functionalMonitoring: {
        name: 'Functional Monitoring',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID Name', title: 'serviceApidName', tooltip: 'serviceApidName', displayed: true },
          { label: 'FID', title: 'fmonId', tooltip: 'fmonId', displayed: true },
          { label: 'FID Label', title: 'fmonIdLabel', tooltip: 'fmonIdLabel', displayed: true },
          { label: 'Name', title: 'fmonName', tooltip: 'fmonName', displayed: true },
          { label: 'Status', title: 'status', tooltip: 'status', displayed: true },
          { label: 'Checking Status', title: 'checkingStatus', tooltip: 'checkingStatus', displayed: true },
          { label: 'Protect. Status', title: 'protectionStatus', tooltip: 'protectionStatus', displayed: true },
          { label: 'RID', title: 'rid', tooltip: 'rid', displayed: true },
          { label: 'RID Label', title: 'ridLabel', tooltip: 'ridLabel', displayed: true },
          { label: 'RID Status', title: 'ridStatus', tooltip: 'ridStatus', displayed: true },
          { label: 'Pakect Name', title: 'packetName', tooltip: 'packetName', displayed: true },
          { label: 'Val. Param', title: 'validityParameterId', tooltip: 'validityParameterId', displayed: true },
          { label: 'Val. Mask', title: 'validityParameterMask', tooltip: 'validityParameterMask', displayed: true },
          { label: 'Val. Exp. Value', title: 'validityParameterExpectedValue', tooltip: 'validityParameterExpectedValue', displayed: true },
          { label: 'Action TC APID', title: 'actionTcApid', tooltip: 'actionTcApid', displayed: true },
          { label: 'Action TC Type', title: 'actionTcType', tooltip: 'actionTcType', displayed: true },
          { label: 'Action TC SubType', title: 'actionTcSubType', tooltip: 'actionTcSubType', displayed: true },
          { label: 'Action Status', title: 'actionStatus', tooltip: 'actionStatus', displayed: true },
          { label: 'Action Name', title: 'actionName', tooltip: 'actionName', displayed: true },
        ],
      },
      parameterMonitorings: {
        name: 'Parameter Monitorings',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID Name', title: 'serviceApidName', tooltip: 'serviceApidName', displayed: true },
          { label: 'FID', title: 'fmonId', tooltip: 'fmonId', displayed: true },
          { label: 'FID Label', title: 'fmonIdLabel', tooltip: 'fmonIdLabel', displayed: true },
          { label: 'Monitoring ID', title: 'paramMonId', tooltip: 'paramMonId', displayed: true },
          { label: 'Monitoring Name', title: 'paramMonName', tooltip: 'paramMonName', displayed: true },
          { label: 'Last Update Mode', title: 'lastUpdateModeId', tooltip: 'lastUpdateModeId', displayed: true },
          { label: 'Last Update Time', title: 'lastUpdateTimeId', tooltip: 'lastUpdateTimeId', displayed: true },
          { label: 'Status', title: 'status', tooltip: 'status', displayed: true },
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

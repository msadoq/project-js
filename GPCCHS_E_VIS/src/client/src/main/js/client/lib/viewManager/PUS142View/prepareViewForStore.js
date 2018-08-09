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
          { label: 'APID Name', title: 'serviceApidName', displayed: true },
          { label: 'FID', title: 'fmonId', displayed: true },
          { label: 'FID Label', title: 'fmonIdLabel', displayed: true },
          { label: 'Name', title: 'fmonName', displayed: true },
          { label: 'Status', title: 'status', displayed: true },
          { label: 'Checking Status', title: 'checkingStatus', displayed: true },
          { label: 'Protect. Status', title: 'protectionStatus', displayed: true },
          { label: 'RID', title: 'rid', displayed: true },
          { label: 'RID Label', title: 'ridLabel', displayed: true },
          { label: 'RID Status', title: 'ridStatus', displayed: true },
          { label: 'Pakect Name', title: 'packetName', displayed: true }, // pending confirmation
          { label: 'Val. Param', title: 'validityParameterId', displayed: true },
          { label: 'Val. Mask', title: 'validityParameterMask', displayed: true },
          { label: 'Val. Exp. Value', title: 'validityParameterExpectedValue', displayed: true },
          { label: 'Action TC APID', title: 'actionTcApid', displayed: true },
          { label: 'Action TC Type', title: 'actionTcType', displayed: true },
          { label: 'Action TC SubType', title: 'actionTcSubType', displayed: true },
          { label: 'Action Status', title: 'actionStatus', displayed: true },
          { label: 'Action Name', title: 'actionName', displayed: true },
        ],
      },
      parameterMonitorings: {
        name: 'Parameter Monitorings',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { title: 'serviceApidName', displayed: true },
          { title: 'fmonId', displayed: true },
          { title: 'fmonIdLabel', displayed: true },
          { title: 'paramMonId', displayed: true },
          { title: 'paramMonName', displayed: true },
          { title: 'lastUpdateModeId', displayed: true },
          { title: 'lastUpdateTimeId', displayed: true },
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

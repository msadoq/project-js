import _ from 'lodash/fp';
import { VM_VIEW_PUS18 } from '../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS18,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 18',
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
      onBoardCtrlProcedures: {
        name: 'On-Board Control Procedures',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID Name', title: 'serviceApidName', displayed: true },
          { label: 'APID', title: 'serviceApid', displayed: true },
          { label: 'Status', title: 'status', displayed: true },
          { label: 'OBCP ID', title: 'obcpId', displayed: true },
          { label: 'OBCP Status', title: 'obcpStatus', displayed: true },
          { label: 'Step', title: 'stepId', displayed: true },
          { label: 'Partition', title: 'partitionId', displayed: true },
          { label: 'Observability Level', title: 'observabilityLevel', displayed: true },
          { label: 'Priority', title: 'priority', displayed: true },
        ],
      },
      procedureParameters: {
        name: 'Procedure Parameters',
        sorting: {
          colName: 'obcpId',
          direction: 'DESC',
        },
        cols: [
          { label: 'OBCP ID', title: 'obcpId', displayed: true },
          { label: 'Parameter ID', title: 'parameterId', displayed: true },
          { label: 'Parameter Name', title: 'parameterName', displayed: true },
          { label: 'Value', title: 'value', displayed: true },
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

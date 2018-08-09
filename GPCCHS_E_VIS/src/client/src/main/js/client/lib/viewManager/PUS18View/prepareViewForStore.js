import _ from 'lodash/fp';
import { VM_VIEW_PUS18 } from '../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS18,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 18, On-Board Storage and Retrieval Service',
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
          colName: 'storeId',
          direction: 'DESC',
        },
        cols: [
          { title: 'serviceApidName', displayed: true },
          { title: 'obcpId', displayed: true },
          { title: 'status', displayed: true },
          { title: 'stepId', displayed: true },
          { title: 'partitionId', displayed: true },
          { title: 'observabilityLevel', displayed: true },
          { title: 'priority', displayed: true },
        ],
      },
      procedureParameters: {
        name: 'Procedure Parameters',
        sorting: {
          colName: 'obcpId',
          direction: 'DESC',
        },
        cols: [
          { title: 'obcpId', displayed: true },
          { title: 'parameterId', displayed: true },
          { title: 'parameterName', displayed: true },
          { title: 'value', displayed: true },
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

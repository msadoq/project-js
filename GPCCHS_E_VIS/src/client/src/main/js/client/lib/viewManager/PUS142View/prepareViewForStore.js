import _ from 'lodash/fp';
import { VM_VIEW_PUS142 } from '../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS142,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 142, On-Board Storage and Retrieval Service',
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
      onBoardStorages: {
        name: 'On-Board Storages',
        sorting: {
          colName: 'storeId',
          direction: 'DESC',
        },
        cols: [
          { title: 'storeId', displayed: true },
          { title: 'status', displayed: true },
          { title: 'storageType', displayed: true },
          { title: 'dumpEnabled', displayed: true },
          { title: 'hkStatusParameterName', displayed: true },
          { title: 'serviceApidName', displayed: true },
          { title: 'storeName', displayed: true },
          { title: 'serviceApid', displayed: true },
        ],
      },
      storageDef: {
        name: 'Storage Definition',
        cols: [
          { title: 'packetApid', displayed: true },
          { title: 'serviceType', displayed: true },
          { title: 'serviceSubType', displayed: true },
          { title: 'sid', displayed: true },
          { title: 'subsamplingRatio', displayed: true },
          { title: 'packetType', displayed: true },
          { title: 'sidLabel', displayed: true },
          { title: 'isSubsamplingRatioSet', displayed: true },
          { title: 'serviceApid', displayed: true },
          { title: 'serviceApidName', displayed: true },
          { title: 'packetApidName', displayed: true },
          { title: 'sidName', displayed: true },
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

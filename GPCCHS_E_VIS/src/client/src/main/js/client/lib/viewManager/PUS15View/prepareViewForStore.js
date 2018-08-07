import _ from 'lodash/fp';
import { VM_VIEW_PUS15 } from '../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS15,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 15, On-Board Storage and Retrieval Service',
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
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { title: 'serviceApidName', displayed: true },
          { title: 'storeId', displayed: true },
          { title: 'hkStoreStatusParameterName', displayed: true },
          { title: 'dumpEnabled', displayed: true },
          { title: 'storeStatus', displayed: true },
          { title: 'downlinkStatus', displayed: true },
          { title: 'storageType', displayed: true },
          { title: 'storeName', displayed: true },
          { title: 'hkDownlinkStatusParameterName', displayed: true },
        ],
      },
      storageDef: {
        name: 'Storage Definitions',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { title: 'serviceApidName', displayed: true },
          { title: 'packetApid', displayed: true },
          { title: 'packetApidName', displayed: true },
          { title: 'serviceType', displayed: true },
          { title: 'serviceSubType', displayed: true },
          { title: 'sid', displayed: true },
          { title: 'sidLabel', displayed: true },
          { title: 'sidName', displayed: true },
          { title: 'subsamplingRatio', displayed: true },
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

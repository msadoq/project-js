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
          { label: 'Apid Name', title: 'serviceApidName', displayed: true },
          { label: 'Store ID', title: 'storeId', displayed: true },
          { label: 'HK Status Parameter', title: 'hkStoreStatusParameterName', displayed: true },
          { label: 'Dump Enabled', title: 'dumpEnabled', displayed: true },
          { label: 'Storage Status', title: 'storeStatus', displayed: true },
          { label: 'Downlink Status', title: 'downlinkStatus', displayed: true },
          { label: 'Type', title: 'storageType', displayed: true },
          { label: 'Name', title: 'storeName', displayed: true },
          { label: 'HK Downlink Status Param. Name', title: 'hkDownlinkStatusParameterName', displayed: true },
        ],
      },
      storageDef: {
        name: 'Storage Definitions',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'Apid Name', title: 'serviceApidName', displayed: true },
          { label: 'APID', title: 'packetApid', displayed: true },
          { label: 'AP. Name', title: 'packetApidName', displayed: true },
          { label: 'Type', title: 'serviceType', displayed: true },
          { label: 'SubType', title: 'serviceSubType', displayed: true },
          { label: 'SID', title: 'sid', displayed: true },
          { label: 'SID Label', title: 'sidLabel', displayed: true },
          { label: 'SID Name', title: 'sidName', displayed: true },
          { label: 'Sampling Ratio', title: 'subsamplingRatio', displayed: true },
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

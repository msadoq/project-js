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
          { label: 'Apid Name', title: 'serviceApidName', tooltip: 'serviceApidName', displayed: true },
          { label: 'Store ID', title: 'storeId', tooltip: 'storeId', displayed: true },
          { label: 'HK Status Parameter', title: 'hkStoreStatusParameterName', tooltip: 'hkStoreStatusParameterName', displayed: true },
          { label: 'Dump Enabled', title: 'dumpEnabled', tooltip: 'dumpEnabled', displayed: true },
          { label: 'Storage Status', title: 'storeStatus', tooltip: 'storeStatus', displayed: true },
          { label: 'Downlink Status', title: 'downlinkStatus', tooltip: 'downlinkStatus', displayed: true },
          { label: 'Type', title: 'storageType', tooltip: 'storageType', displayed: true },
          { label: 'Name', title: 'storeName', tooltip: 'storeName', displayed: true },
          { label: 'HK Downlink Status Param. Name', title: 'hkDownlinkStatusParameterName', tooltip: 'hkDownlinkStatusParameterName', displayed: true },
        ],
      },
      storageDef: {
        name: 'Storage Definitions',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'Store ID', title: 'storeId', tooltip: 'storeId', displayed: true },
          { label: 'Apid Name', title: 'serviceApidName', tooltip: 'serviceApidName', displayed: true },
          { label: 'APID', title: 'packetApid', tooltip: 'packetApid', displayed: true },
          { label: 'AP. Name', title: 'packetApidName', tooltip: 'packetApidName', displayed: true },
          { label: 'Type', title: 'serviceType', tooltip: 'serviceType', displayed: true },
          { label: 'SubType', title: 'serviceSubType', tooltip: 'serviceSubType', displayed: true },
          { label: 'SID', title: 'sid', tooltip: 'sid', displayed: true },
          { label: 'SID Label', title: 'sidLabel', tooltip: 'sidLabel', displayed: true },
          { label: 'SID Name', title: 'sidName', tooltip: 'sidName', displayed: true },
          { label: 'Sampling Ratio', title: 'subsamplingRatio', tooltip: 'subsamplingRatio', displayed: true },
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

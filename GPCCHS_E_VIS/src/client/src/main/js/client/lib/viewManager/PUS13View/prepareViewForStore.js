import _ from 'lodash/fp';
import { VM_VIEW_PUS13 } from '../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS13,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 13',
  titleStyle: {
    align: 'left',
    bold: false,
    color: '#000000',
    font: 'Arial',
    italic: false,
    size: 13,
    strikeOut: false,
    underline: false,
  },
  configuration: {
    entryPoint: {},
    tables: {
      uplink: {
        name: 'Table Large Data Transfer - Uplink',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'Apid Name', title: 'serviceApidName', tooltip: 'serviceApidName', displayed: true },
          { label: 'LDU ID', title: 'duId', tooltip: 'duId', displayed: true },
          { label: 'Status', title: 'status', tooltip: 'status', displayed: true },
          { label: 'Type', title: 'transferType', tooltip: 'transferType', displayed: true },
          { label: 'File Type', title: 'fileTypeCode', tooltip: 'fileTypeCode', displayed: true },
          { label: 'Start Time', title: 'startTime', tooltip: 'startTime', displayed: true },
          { label: 'End Time', title: 'endTime', tooltip: 'endTime', displayed: true },
          { label: 'Size', title: 'size', tooltip: 'size', displayed: true },
          { label: 'Remain Size', title: 'remainingSize', tooltip: 'remainingSize', displayed: true },
          { label: '%', title: 'percent', tooltip: 'percent', displayed: true },
          { label: 'Reason', title: 'failureCode', tooltip: 'failureCode', displayed: true },
          { label: 'Partition ID', title: 'partitionId', tooltip: 'partitionId', displayed: true },
          { label: 'File ID', title: 'fileId', tooltip: 'fileId', displayed: true },
          { label: 'Checksum', title: 'fileChecksum', tooltip: 'fileChecksum', displayed: true },
        ],
      },
      downlink: {
        name: 'Table Large Data Transfer - Downlink',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'Apid Name', title: 'serviceApidName', displayed: true },
          { label: 'LDU ID', title: 'duId', displayed: true },
          { label: 'Status', title: 'status', displayed: true },
          { label: 'Type', title: 'transferType', displayed: true },
          { label: 'File Type', title: 'fileTypeCode', displayed: true },
          { label: 'Start Time', title: 'startTime', displayed: true },
          { label: 'End Time', title: 'endTime', displayed: true },
          { label: 'Size', title: 'size', displayed: true },
          { label: 'Remain Size', title: 'remainingSize', displayed: true },
          { label: '%', title: 'percent', displayed: true },
          { label: 'Reason', title: 'failureCode', displayed: true },
          { label: 'Partition ID', title: 'partitionId', displayed: true },
          { label: 'File ID', title: 'fileId', displayed: true },
          { label: 'Checksum', title: 'fileChecksum', displayed: true },
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

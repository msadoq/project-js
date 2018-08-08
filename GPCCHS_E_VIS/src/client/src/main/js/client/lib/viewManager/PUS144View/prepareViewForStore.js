import _ from 'lodash/fp';
import { VM_VIEW_PUS144 } from '../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS144,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 144, On-Board Storage and Retrieval Service',
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
      onBoardPartitions: {
        name: 'On-Board Partitions',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID Name', title: 'serviceApidName', displayed: true },
          { label: 'ID', title: 'partitionId', displayed: true },
          { label: 'File ID', title: 'fileId', displayed: true },
          { label: 'File Type', title: 'fileType', displayed: true },
          { label: 'File Size', title: 'fileSize', displayed: true },
          { label: 'Creation Time', title: 'fileCreationTime', displayed: true },
          { label: 'Protection Status', title: 'fileProtectionStatus', displayed: true },
          { label: 'Mode', title: 'fileMode', displayed: true },
          { label: 'Address', title: 'fileAddress', displayed: true },
          { label: 'Uploaded Checksum', title: 'uploadedFileChecksum', displayed: true },
          { label: 'Reported Checksum', title: 'computedFileChecksum', displayed: true },
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

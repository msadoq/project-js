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
          { title: 'serviceApidName', displayed: true },
          { title: 'partitionId', displayed: true },
          { title: 'fileId', displayed: true },
          { title: 'fileType', displayed: true },
          { title: 'fileSize', displayed: true },
          { title: 'fileCreationTime', displayed: true },
          { title: 'fileProtectionStatus', displayed: true },
          { title: 'fileMode', displayed: true },
          { title: 'fileAddress', displayed: true },
          { title: 'uploadedFileChecksum', displayed: true },
          { title: 'computedFileChecksum', displayed: true },
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

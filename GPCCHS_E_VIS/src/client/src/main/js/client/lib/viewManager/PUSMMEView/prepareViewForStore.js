import _ from 'lodash/fp';
import { VM_VIEW_PUSMME } from '../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUSMME,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'House Keeping and diagnostic packets (PUS MME)',
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
      packets: {
        name: 'Packets',
        sorting: {
          colName: 'sid',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID Name', title: 'serviceApidName', displayed: true },
          { label: 'SID', title: 'sid', displayed: true },
          { label: 'SID Label', title: 'sidLabel', displayed: true },
          { label: 'Name', title: 'packetName', displayed: true },
          { label: 'Type', title: 'packetType', displayed: true },
          { label: 'AP Name', title: 'packetApidName', displayed: true },
          { label: 'Status', title: 'status', displayed: true },
          { label: 'Val. Param. ID', title: 'validityParameterId', displayed: true },
          { label: 'Val. Param. Name', title: 'validityParameterName', displayed: true },
          { label: 'Val. Param. Mask', title: 'validityParameterMask', displayed: true },
          { label: 'Val. Param. Exp. Value', title: 'validityParameterExpectedValue', displayed: true },
          { label: 'Collect. Int.', title: 'collectionInterval', displayed: true },
          { label: 'Forward. Status', title: 'forwardingStatusTypeSubtype', displayed: true },
          { label: 'Forward. Status RID SID', title: 'forwardingStatusRidSid', displayed: true },
          { label: 'Subsamp. Ratio', title: 'subsamplingRatio', displayed: true },
          { label: 'Gen. Mode', title: 'generationMode', displayed: true },
          { label: 'Packet APID', title: 'packetApid', displayed: true },
          { label: 'Service APID', title: 'serviceApid', displayed: true },
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

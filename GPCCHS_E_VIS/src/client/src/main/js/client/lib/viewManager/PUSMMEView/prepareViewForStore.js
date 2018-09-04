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
        name: 'House-Keeping and Diagnostic Packets',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID Name', title: 'serviceApidName', tooltip: 'serviceApidName', displayed: true },
          { label: 'SID', title: 'sid', tooltip: 'sid', displayed: true },
          { label: 'SID Label', title: 'sidLabel', tooltip: 'sidLabel', displayed: true },
          { label: 'Name', title: 'packetName', tooltip: 'packetName', displayed: true },
          { label: 'Type', title: 'packetType', tooltip: 'packetType', displayed: true },
          { label: 'AP Name', title: 'packetApidName', tooltip: 'packetApidName', displayed: true },
          { label: 'Status', title: 'status', tooltip: 'status', displayed: true },
          { label: 'Val. Param. ID', title: 'validityParameterId', tooltip: 'validityParameterId', displayed: true },
          { label: 'Val. Param. Name', title: 'validityParameterName', tooltip: 'validityParameterName', displayed: true },
          { label: 'Val. Param. Mask', title: 'validityParameterMask', tooltip: 'validityParameterMask', displayed: true },
          { label: 'Val. Exp. Value', title: 'validityParameterExpectedValue', tooltip: 'validityParameterExpectedValue', displayed: true },
          { label: 'Collect. Int.', title: 'collectionInterval', tooltip: 'collectionInterval', displayed: true },
          { label: 'Forward. Status', title: 'forwardingStatusTypeSubtype', tooltip: 'forwardingStatusTypeSubtype', displayed: true },
          { label: 'Forward. Status RID SID', title: 'forwardingStatusRidSid', tooltip: 'forwardingStatusRidSid', displayed: true },
          { label: 'Subsamp. Ratio', title: 'subsamplingRatio', tooltip: 'subsamplingRatio', displayed: true },
          { label: 'Gen. Mode', title: 'generationMode', tooltip: 'generationMode', displayed: true },
          { label: 'Packet APID', title: 'packetApid', tooltip: 'packetApid', displayed: true },
          { label: 'Service APID', title: 'serviceApid', tooltip: 'serviceApid', displayed: true },
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

import _ from 'lodash/fp';
import { VM_VIEW_PUS14 } from '../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS14,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 14, Packet Forwarding Service',
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
      packetForwarding: {
        name: 'Table Packet Forwarding',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'Apid Name', title: 'serviceApidName', tooltip: 'serviceApidName', displayed: true },
          { label: 'Name', title: 'packetName', tooltip: 'packetName', displayed: true },
          { label: 'APID', title: 'packetApid', tooltip: 'packetApid', displayed: true },
          { label: 'AP Name', title: 'packetApidName', tooltip: 'packetApidName', displayed: true },
          { label: 'Type', title: 'serviceType', tooltip: 'serviceType', displayed: true },
          { label: 'SubType', title: 'serviceSubType', tooltip: 'serviceSubType', displayed: true },
          { label: 'Fwd Status (APID/T/ST)', title: 'forwardingStatusTypeSubtype', tooltip: 'forwardingStatusTypeSubtype', displayed: true },
          { label: 'RID', title: 'rid', tooltip: 'rid', displayed: true },
          { label: 'RID Label', title: 'ridLabel', tooltip: 'ridLabel', displayed: true },
          { label: 'SID', title: 'sid', tooltip: 'sid', displayed: true },
          { label: 'SID Label', title: 'sidLabel', tooltip: 'sidLabel', displayed: true },
          { label: 'Sample Ratio', title: 'subsamplingRatio', tooltip: 'subsamplingRatio', displayed: true },
          { label: 'Packet Type', title: 'packetType', tooltip: 'packetType', displayed: true },
          { label: 'Fwd Status RID SID', title: 'forwardingStatusRidSid', tooltip: 'forwardingStatusRidSid', displayed: true },
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

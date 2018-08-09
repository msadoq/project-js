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
          { label: 'Apid Name', title: 'serviceApidName', displayed: true }, // Inutilisé dans la vue
          { label: 'Name', title: 'packetName', displayed: true }, // A afficher dans le tableau de packets
          { label: 'APID', title: 'packetApid', displayed: true }, // A afficher dans le tableau de packets
          { label: 'AP Name', title: 'packetApidName', displayed: true }, // A afficher dans le tableau de packets
          { label: 'Type', title: 'serviceType', displayed: true }, // A afficher dans le tableau de packets
          { label: 'SubType', title: 'serviceSubType', displayed: true }, // A afficher dans le tableau de packets
          { label: 'Fwd Status (APID/T/ST)', title: 'forwardingStatus', displayed: true }, // A afficher dans le tableau de packets
          { label: 'RID', title: 'rid', displayed: true }, // A afficher dans le tableau de packets
          { label: 'RID Label', title: 'ridLabel', displayed: true }, // A afficher dans le tableau de packets
          { label: 'SID', title: 'sid', displayed: true }, // A afficher dans le tableau de packets
          { label: 'SID Label', title: 'sidLabel', displayed: true }, // A afficher dans le tableau de packets
          { label: 'Sample Ratio', title: 'subsamplingRatio', displayed: true }, // A afficher dans le tableau de packets
          { label: 'Packet Type', title: 'packetType', displayed: true }, // Tooltip sur serviceType, serviceSubType
          { label: 'Fwd Status RID SID', title: 'forwardingStatusRidSid', displayed: true }, // Tooltip sur serviceType, serviceSubType
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

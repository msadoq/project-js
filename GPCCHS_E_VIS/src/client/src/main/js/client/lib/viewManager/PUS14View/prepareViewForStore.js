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
      pus014TmPacket: {
        name: 'Tm Packets',
        sorting: {
          colName: 'packetApid',
          direction: 'DESC',
        },
        cols: [
          { title: 'packetApid', displayed: true }, // A afficher dans le tableau de packets
          { title: 'forwardingStatus', displayed: true }, // A afficher dans le tableau de packets
          { title: 'lastUpdateModeFwdStatus', displayed: true }, // Tooltip sur forwardingStatus
          { title: 'lastUpdateTimeFwdStatus', displayed: true }, // Tooltip sur forwardingStatus
          { title: 'packetApidName', displayed: true }, // A afficher dans le tableau de packets
          { title: 'serviceApid', displayed: true }, // Inutilisé dans la vue
          { title: 'packetName', displayed: true }, // A afficher dans le tableau de packets
          { title: 'serviceApidName', displayed: true }, // Inutilisé dans la vue
          { title: 'lastUpdateModeRid', displayed: true }, // Tooltip sur rid / ridLabel
          { title: 'lastUpdateTimeRid', displayed: true }, // Tooltip sur rid / ridLabel
          { title: 'rid', displayed: true }, // A afficher dans le tableau de packets
          { title: 'ridLabel', displayed: true }, // A afficher dans le tableau de packets
          { title: 'lastUpdateModeSid', displayed: true }, // Tooltip sur sid, sidLabel
          { title: 'lastUpdateTimeSid', displayed: true }, // Tooltip sur sid, sidLabel
          { title: 'lastUpdateModeSubSamplingRatio', displayed: true }, // Tooltip sur subsamplingRatio
          { title: 'lastUpdateTimeSubSamplingRatio', displayed: true }, // Tooltip sur subsamplingRatio
          { title: 'subsamplingRatio', displayed: true }, // A afficher dans le tableau de packets
          { title: 'sid', displayed: true }, // A afficher dans le tableau de packets
          { title: 'sidLabel', displayed: true }, // A afficher dans le tableau de packets
          { title: 'lastUpdateModeTypeSubType', displayed: true }, // Tooltip sur serviceType, serviceSubType
          { title: 'lastUpdateTimeTypeSubType', displayed: true }, // Tooltip sur serviceType, serviceSubType
          { title: 'serviceType', displayed: true }, // A afficher dans le tableau de packets
          { title: 'serviceSubType', displayed: true }, // A afficher dans le tableau de packets
          // { title: 'uniqueId', displayed: true }, // Inutilisé dans la vue
          { title: 'status', displayed: true }, // Non affiché dans la vue.  Si 3 (DELETED), supprimer l’entrée du state
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

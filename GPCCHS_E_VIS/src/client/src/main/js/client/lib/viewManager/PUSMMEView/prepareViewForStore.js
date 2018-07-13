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
          { title: 'sid', displayed: true },
          { title: 'validityParameterId', displayed: true },
          { title: 'validityParameterMask', displayed: true },
          { title: 'validityParameterExpectedValue', displayed: true },
          { title: 'collectionInterval', displayed: true },
          { title: 'sidLabel', displayed: true },
          { title: 'packetName', displayed: true },
          { title: 'validityParameterName', displayed: true },
          { title: 'packetApid', displayed: true },
          { title: 'packetApidName', displayed: true },
          { title: 'serviceApid', displayed: true },
          { title: 'serviceApidName', displayed: true },
          { title: 'generationMode', displayed: true },
          { title: 'packetType', displayed: true },
          { title: 'forwardingStatusTypeSubtype', displayed: true },
          { title: 'forwardingStatusRidSid', displayed: true },
          { title: 'subsamplingRatio', displayed: true },
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

import _ from 'lodash/fp';
import { VM_VIEW_PUS19 } from '../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS19,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 19',
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
      eventActions: {
        name: 'Event Actions',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID Name', title: 'serviceApidName', tooltip: 'serviceApidName', displayed: true },
          { label: 'AP ID', title: 'apid', tooltip: 'apid', displayed: true },
          { label: 'AP Name', title: 'apidName', tooltip: 'apidName', displayed: true },
          { label: 'RID', title: 'rid', tooltip: 'rid', displayed: true },
          { label: 'RID Label', title: 'ridLabel', tooltip: 'ridLabel', displayed: true },
          { label: 'Name', title: 'actionName', tooltip: 'actionName', displayed: true },
          { label: 'Status', title: 'actionStatus', tooltip: 'actionStatus', displayed: true },
          { label: 'Action TC', title: 'packetName', tooltip: 'packetName', displayed: true },
          { label: 'Description', title: 'actionDescription', tooltip: 'actionDescription', displayed: true },
          { label: 'Action TC APID', title: 'actionTcApid', tooltip: 'actionTcApid', displayed: true },
          { label: 'Action TC Type', title: 'actionTcType', tooltip: 'actionTcType', displayed: true },
          { label: 'Action TC Subtype', title: 'actionTcSubType', tooltip: 'actionTcSubType', displayed: true },
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

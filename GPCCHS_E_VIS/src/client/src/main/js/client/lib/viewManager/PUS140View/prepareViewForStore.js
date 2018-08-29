import _ from 'lodash/fp';
import { VM_VIEW_PUS140 } from '../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS140,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'PUS Service 140',
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
      parameters: {
        name: 'Parameters',
        sorting: {
          colName: 'serviceApidName',
          direction: 'DESC',
        },
        cols: [
          { label: 'APID Name', title: 'parameterApidName', tooltip: 'parameterApidName', displayed: true },
          { label: 'APID', title: 'parameterApid', tooltip: 'parameterApid', displayed: true },
          { label: 'ID', title: 'parameterId', tooltip: 'parameterId', displayed: true },
          { label: 'Name', title: 'parameterName', tooltip: 'parameterName', displayed: true },
          { label: 'Init. Value', title: 'initialValue', tooltip: 'initialValue', displayed: true },
          { label: 'Cur. Value', title: 'currentValue', tooltip: 'currentValue', displayed: true },
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

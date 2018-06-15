import _ from 'lodash/fp';
import { VM_VIEW_PUS05 } from '../constants';
import { moveProp } from '../../common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: VM_VIEW_PUS05,
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'Event Reporting Service model (PUS05)',
  configuration: {
    entryPoint: {},
  },
}, view);

export default _.pipe(
  getDefaultView,
  _.update('configuration', _.pipe(
    moveProp('entryPoint', 'entryPoints'),
    _.update('entryPoints', singleton)
  ))
);

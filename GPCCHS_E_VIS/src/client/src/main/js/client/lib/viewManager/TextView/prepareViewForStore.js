import { v4 } from 'uuid';
import _ from 'lodash/fp';

const getDefaultConfiguration = _.merge({
  type: 'TextView',
  content: '',
  defaultRatio: { length: 5, width: 5 },
  entryPoints: [],
  links: [],
  title: 'New Text View',
});

export default _.update('configuration', _.pipe(
    getDefaultConfiguration,
    _.update('entryPoints', _.map(_.update('id', v4)))
  )
);

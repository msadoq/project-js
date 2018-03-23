// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Restore commonEditor/Fields/FiltersFields tests + add test env in babelrc
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

import { shallowRenderSnapshot } from 'common/jest/utils';
import FiltersFields from './FiltersFields';

const propsStub = {
  form: 'form',
  fields: {
    push: () => null,
    remove: () => null,
    insert: () => null,
    getAll: () => [{
      field: 'convertedValue',
      operator: '<=',
      operand: '0',
    }],
  },
};

describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: Fields', () => {
      describe('viewManager :: commonEditor :: Fields :: FiltersFields', () => {
        test('snapshot', () => {
          shallowRenderSnapshot(FiltersFields, propsStub);
        });
      });
    });
  });
});

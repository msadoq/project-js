import ColsFields from 'viewManager/commonEditor/Fields/ColsFields';
import stateTest from 'common/jest/stateTest';
import _ from 'lodash';
import { shallowRenderSnapshot } from '../../../common/jest/utils';

const propsStub = {
  fields: {
    push: () => {},
    remove: () => {},
    insert: () => {},
    getAll: () => [],
  },
};

describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: Fields', () => {
      describe('viewManager :: commonEditor :: Fields :: ColsFields', () => {
        test('snapshot empty', () => {
          shallowRenderSnapshot(ColsFields, propsStub, stateTest);
        });
        test('snapshot empty', () => {
          shallowRenderSnapshot(ColsFields, _.set(propsStub, 'fields.getAll', () => stateTest.GroundAlarmViewConfiguration.groundAlarm1.cols), stateTest);
        });
      });
    });
  });
});

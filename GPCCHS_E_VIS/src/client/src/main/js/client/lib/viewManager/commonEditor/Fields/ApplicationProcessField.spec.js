import ApplicationProcessField, { findAPID } from 'viewManager/commonEditor/Fields/ApplicationProcessField';
import { REQUESTING } from 'store/reducers/apids';
import { shallowRenderSnapshot } from '../../../common/jest/utils';

const propsStub = {
  apids: [{
    '2-42': [{
      apidName: 'TIMEPACKET',
      apidRawValue: 0,
    }, {
      apidName: 'ATTITUDE',
      apidRawValue: 1,
    }],
  }],
  askApids: () => null,
};

describe('viewManager :: commonEditor :: Fields :: ApplicationProcessField', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(ApplicationProcessField, propsStub, {});
  });
  test('snapshot 2', () => {
    const propsStub2 = { ...propsStub, apids: REQUESTING };
    shallowRenderSnapshot(ApplicationProcessField, propsStub2, {});
  });
});

describe('application process field', () => {
  const apids = [
    { apidName: 'TIMEPACKET', apidRawValue: 0 },
    { apidName: 'ATTITUDE', apidRawValue: 1 },
  ];
  it('should find the corresponding apid', () => {
    expect(findAPID(apids, 'ATTITUDE')).toEqual({ apidName: 'ATTITUDE', apidRawValue: 1 });
  });
  [undefined, null, '', 'foo'].map(test =>
    it('should find nothing', () => {
      expect(findAPID(apids, test)).toEqual(undefined);
    })
  );
});

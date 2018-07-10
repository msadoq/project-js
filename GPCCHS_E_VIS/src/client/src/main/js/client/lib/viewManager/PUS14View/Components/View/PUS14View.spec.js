import PUS14View, { isValid, renderInvald } from 'viewManager/PUS14View/Components/View/PUS14View';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import renderer from 'react-test-renderer';

const propsStub = {
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
  groundDate: '1528359679639',
  serviceApid: 100,
  status: 1,
  serviceApidName: 'myString',
  uniqueId: '100',
  pus014TmPacket: [],
  openModal: () => null,
};

describe('viewManager/PUS14View/Components/View/PUS14View', () => {
  describe('PUS14View :: render', () => {
    test('snapshot', () => {
      shallowRenderSnapshot(PUS14View, propsStub, stateTest);
    });
  });

  describe('PUS14View :: renderInvald', () => {
    test('snapshot', () => {
      const tree = renderer.create(renderInvald('this is an error message'))
        .toJSON()
      ;
      expect(tree).toMatchSnapshot();
    });
  });

  describe('PUS14View :: isValid', () => {
    [null, undefined, []].map(apids =>
      [null, undefined].map(applicationProcessId =>
        it('should return false with invalid data', () => {
          expect(isValid(apids, applicationProcessId)).toBe(false);
        })
      )
    );
    it('should return true with valid data', () => {
      expect(isValid(['ORBIT'], 0)).toBe(true);
    });
  });
});

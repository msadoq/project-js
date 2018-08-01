import PUS144View, { isValid, renderInvald } from 'viewManager/PUS144View/Components/View/PUS144View';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import renderer from 'react-test-renderer';

const propsStub = {
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
  applicationProcessName: 'string',
  applicationProcessId: 144,
  serviceApid: 144,
  serviceApidName: 'string',
  availableSpace: 'string',
  spaceType: 'string',
  lastUpdateTime: 1528359679639,
  lastUpdateType: 'string',
  onBoardStorages: [],
  stroragesDef: [],
  apids: [{ apidName: 'ORBIT', apidRawValue: '0' }],
};

describe('viewManager/PUS144View/Components/View/PUS144View', () => {
  describe('PUS144View :: render', () => {
    test('snapshot', () => {
      shallowRenderSnapshot(PUS144View, propsStub, stateTest);
    });
  });

  describe('PUS144View :: renderInvald', () => {
    test('snapshot', () => {
      const tree = renderer.create(renderInvald('this is an error message'))
        .toJSON()
      ;
      expect(tree).toMatchSnapshot();
    });
  });

  describe('PUS144View :: isValid', () => {
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

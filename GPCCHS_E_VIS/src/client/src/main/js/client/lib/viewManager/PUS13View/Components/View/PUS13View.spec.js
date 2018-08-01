import PUS13View, { isValid, renderInvald } from 'viewManager/PUS13View/Components/View/PUS13View';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import renderer from 'react-test-renderer';

const propsStub = {
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
  applicationProcessName: 'string',
  applicationProcessId: 13,
  serviceApid: 100,
  noOfParameterMonitoringDefinition: 100,
  serviceStatus: 1,
  serviceApidName: 'string',
  availableSpace: 'string',
  spaceType: 'string',
  lastUpdateTimeServiceStatus: '1528359679639',
  lastUpdateTypeServiceStatus: '1',
  parameterMonitoringDefinitions: [],
  apids: [{ apidName: 'ORBIT', apidRawValue: '2' }],
};

describe('viewManager/PUS13View/Components/View/PUS13View', () => {
  describe('PUS13View :: render', () => {
    test('snapshot', () => {
      shallowRenderSnapshot(PUS13View, propsStub, stateTest);
    });
  });

  describe('PUS13View :: renderInvald', () => {
    test('snapshot', () => {
      const tree = renderer.create(renderInvald('this is an error message'))
        .toJSON()
      ;
      expect(tree).toMatchSnapshot();
    });
  });

  describe('PUS13View :: isValid', () => {
    [null, undefined, []].map(apids =>
      [null, undefined].map(applicationProcessId =>
        it('should return false with invalid data', () => {
          expect(isValid(apids, applicationProcessId)).toBe(false);
        })
      )
    );
    const { apids, serviceApid } = propsStub;
    it('should return true with valid data', () => {
      expect(isValid(apids, serviceApid)).toBe(true);
    });
  });
});

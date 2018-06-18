import DefaultPusData from 'viewManager/commonEditor/DefaultPusData';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  viewId: 'text1',
  pageId: 'page1',
  selectedDomainName: 'fr.cnes.isis.simupus',
  selectedSessionName: 'Master',
};

describe('DefaultPusData :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(DefaultPusData, propsStub, stateTest);
  });
});

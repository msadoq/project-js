import PUSMMEModal from 'viewManager/PUSMMEView/Components/View/PUSMMEModal';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  closeModal: () => null,
  packetStore: [
    {
      storeName: 'myString',  // A afficher dans la popin sur un Dble Click d’une ligne du tableau
      storeId: 1,  // A afficher dans la popin sur un Dble Click d’une ligne du tableau
      storeStatus: 1,  // A afficher dans la popin sur un Dble Click d’une ligne du tableau
      subSamplingRatio: 1,  // A afficher dans la popin sur un Dble Click d’une ligne du tableau
      lastUpdateModeStoreId: 1, // Tooltip sur storeId
      lastUpdateTimeStoreId: 123, // Tooltip sur storeId
      lastUpdateModeStoreStatus: 1, // Tooltip sur storeStatus
      lastUpdateTimeStoreStatus: 1531404207354, // Tooltip sur storeStatus
      lastUpdateModeSubSamplingRatio: 1, // Tooltip sur subSamplingRatio
      lastUpdateTimeSubSamplingRatio: 1531404207354, // Tooltip sur subSamplingRatio
      uniqueId: 1, // Inutilisé dans la vue
    },
  ],
  packetParameter: [
    {
      parameterId: 1,  // A afficher dans la popin sur un Dble Click d’une ligne du tableau
      parameterName: 'myString', // A afficher dans la popin sur un Dble Click d’une ligne du tableau
      parameterOrder: 1, // A afficher dans la popin sur un Dble Click d’une ligne du tableau
      parameterFilteredStatus: 'myString', // A afficher dans la popin sur un Dble Click d’une ligne du tableau
      uniqueId: 1, // inutilisé dans la vue
      lastUpdateModeStoreId: 1, // inutilisé dans la vue
      lastUpdateTimeStoreId: 1531404207354, // inutilisé dans la vue
      lastUpdateModeFilteredStatus: 1, // Tooltip sur parameterFilteredStatus
      lastUpdateTimeFilteredStatus: 1531404207354, // Tooltip sur parameterFilteredStatus
    },
  ],
};

describe('PUSMMEModal :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUSMMEModal, propsStub, stateTest);
  });
});


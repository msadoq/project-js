import { should, getStore } from '../../app/utils/test';
import workspace from '../../app/documents/workspace';
import path from 'path';
import main from './main';
import { getView } from '../../app/store/mutations/viewReducer';

describe('TextView/main', () => {
  it('getConnectedDataFromState', () => {
    const { getState } = getStore({
      views: {
        v1: { type: 'TextView', configuration: { textViewEntryPoints: [
          {
           connectedData: { uuid: 'cd1' },
         }
        ] } },
        v2: { type: 'TextView', configuration: [] },
        v3: { type: 'TextView', configuration: { textViewEntryPoints: [
          { connectedData: { uuid: 'cd2' } },
          { connectedData: { uuid: 'cd3' } },
        ] } },
      },
      connectedData: {
        cd1: { formula: 'xf-f' },
        cd2: { formula: 'xf+f' },
        cd3: { formula: 'xf*f' },
      },
    });
    const { title, configuration } = getView(getState(), 'v3');
    const cd = main.getConnectedDataFromState(getState(), configuration.textViewEntryPoints);
    cd.should.be.an('object').with.all.keys(['cd2', 'cd3']);
  });
});

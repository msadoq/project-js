import { should, getStore } from '../../app/utils/test';
import workspace from '../../app/documents/workspace';
import path from 'path';
import main from './main';
import { getView } from '../../app/store/mutations/viewReducer';

describe('PlotView/main', () => {
  it('getConnectedDataFromState', () => {
    const { getState } = getStore({
      views: {
        v1: { type: 'PlotView', configuration: { plotViewEntryPoints: [
          {
           connectedDataX: { uuid: 'cdx1' },
           connectedDataY: { uuid: 'cdy1' },
         }
        ] } },
        v2: { type: 'PlotView', configuration: [] },
        v3: { type: 'PlotView', configuration: { plotViewEntryPoints: [
          { connectedDataX: { uuid: 'cdx2' } ,
           connectedDataY: { uuid: 'cdy2' } },
          { connectedDataX: { uuid: 'cdx3' },
           connectedDataY: { uuid: 'cdy3' } },
        ] } },
      },
      connectedData: {
        cdx1: { formula: 'xf-f' },
        cdy1: { formula: 'yf-f' },
        cdx2: { formula: 'xf+f' },
        cdy2: { formula: 'yf+f' },
        cdx3: { formula: 'xf*f' },
        cdy3: { formula: 'yf*f' },
      },
    });
    const { title, configuration } = getView(getState(), 'v3');
    const cd = main.getConnectedDataFromState(getState(), configuration.plotViewEntryPoints);
    cd.should.be.an('object').with.all.keys(['cdx2', 'cdy2', 'cdx3', 'cdy3']);
  });
});

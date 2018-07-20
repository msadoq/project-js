import Legend from './Legend';
import { shallowRenderSnapshot } from '../../../../common/jest/utils';

const propsStub = {
  axes: {
    VBat: {
      id: 'VBat',
      label: 'VBat',
      showAxis: true,
    },
    time: {
      id: 'Time',
      label: 'Time',
      showAxis: true,
    },
  },
  hideEp: () => null,
  hideEpNames: [],
  legendLocation: 'top',
  lines: [
    {
      name: 'TMMGT_BC_VIRTCHAN3',
      connectedData: {
        axisId: 'VBat',
      },
      objectStyle: {
        curveColor: '#FF0000',
        displayLine: true,
        displayPoints: false,
      },
    },
    {
      name: 'ATT_BC_REVTCOUNT1',
      connectedData: {
        axisId: 'time',
      },
      objectStyle: {
        curveColor: '#00FF00',
        displayLine: true,
        displayPoints: false,
      },
    },
  ],
  onContextMenu: () => null,
  plotHeight: 506,
  removeEntryPoint: () => null,
  show: true,
  showEp: () => null,
  showEpNames: [],
  showEpNonNominal: [],
  showNonNominal: () => null,
  toggleShowLegend: () => null,
};

describe('viewManager/PlotView/Components/View/Legend', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      shallowRenderSnapshot(Legend, propsStub, {});
    });
  });
});

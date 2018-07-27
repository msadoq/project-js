import { getFilteredAxes } from './EntryPointConnectedData';

const propsStub = {
  axes: {
    VBat: {
      id: 'VBat',
      label: 'VBat',
      unit: 'V',
    },
    time: {
      id: 'time',
      label: 'Time',
      unit: 's',
    },
  },
  unitX: null,
  unitY: null,
  unit: null,
  xAxisId: null,
  yAxisId: null,
  axisId: null,
};
describe('viewManager/PlotView/Components/Editor/EntryPointConnectedData', () => {
  describe('getFilteredAxes', () => {
    it('should only keep matching units', () => {
      expect(getFilteredAxes({
        ...propsStub,
        unit: 'V',
      })).toEqual([
        {
          axisId: 'VBat',
          id: 'VBat',
          label: 'VBat',
          unit: 'V',
        },
        {
          axisId: 'time',
          id: 'time',
          label: 'Time',
          unit: 's',
        },
      ]
    );
    });
  });
});

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
    it('should filter all as no same unit', () => {
      expect(getFilteredAxes(propsStub)).toEqual([]);
    });
    it('should onlmy keep matching units', () => {
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
      ]
    );
    });
  });
});

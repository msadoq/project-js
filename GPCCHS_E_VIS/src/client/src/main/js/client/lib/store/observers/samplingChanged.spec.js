import samplingChanged from './samplingChanged';

describe('samplingChanged must return true when sampling changed', () => {
  const mapX = {
    perView: [
      {
        sampling: {
          samplingStatus: 'On',
        },
      },
    ],
  };
  const mapY = {
    perView: [
      {
        sampling: {
          samplingStatus: 'Off',
        },
      },
    ],
  };
  const mapZ = {
    perView: [
      {
        sampling: {
          samplingStatus: 'On',
        },
      },
    ],
  };
  const testId = 0;
  test('samplingChanged must return true if sampling changed', () => {
    expect(samplingChanged(mapX, mapY, testId)).toBe(true);
  });
  test('samplingChanged must return false if sampling did not change', () => {
    expect(samplingChanged(mapX, mapZ, testId)).toBe(false);
  });
});

import _reduce from 'lodash/reduce';

// TODO test
export default function computeForecastIntervals(expectedIntervals, forecast) {
  // loop on remoteId/localId and create a new interval
  return _reduce(expectedIntervals, (acc, value, remoteId) =>
      ({ ...acc,
        [remoteId]:
          _reduce(value, (accInt, intervals, localId) =>
              ({ ...accInt,
                [localId]: {
                  expectedInterval: [
                    intervals.expectedInterval[1],
                    intervals.expectedInterval[1] + forecast],
                } })
            , {}) }),
    {});
}

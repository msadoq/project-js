import { viewRangeAdd } from './viewDataUpdate';

describe('History viewDataUpdate', () => {
  it('should add payload data into table state', () => {
    const viewState = {};

    const viewId = 'history-123';

    const historyConfig = {
      entryPoints: [
        {
          name: 'ep1',
          id: 'ep1',
          connectedData: {},
        },
      ],
      tables: {
        history: {
          sorting: {
            colName: 'referenceTimestamp',
            direction: 'DESC',
          },
        },
      },
    };

    const dateOne = new Date('2018-08-29T11:44:58.890Z');
    const dateTwo = new Date('2018-08-29T11:44:59.890Z');

    const payloads = {
      ep1: {
        [dateOne.getTime()]: {
          epName: 'ep1',
          referenceTimestamp: dateOne.toISOString(),
          convertedValue: 1000,
        },
        [dateTwo.getTime()]: {
          epName: 'ep1',
          referenceTimestamp: dateTwo.toISOString(),
          convertedValue: 1100,
        },
      },
    };

    const updatedState = viewRangeAdd(viewState, viewId, payloads, historyConfig);

    expect(updatedState).toMatchSnapshot();
  });
});

import { computeTimelineFieldOptions } from './TimelineField';

const propsStub = {
  timelines: [
    {
      id: 'Session 1',
    },
    {
      id: 'Session 2',
    },
  ],
  timelineName: 'Session 3',
};
describe('TimelineField :: render', () => {
  test('TimelineField :: computeTimelineFieldOptions :: empty timeline', () => {
    const options = computeTimelineFieldOptions(
      propsStub.timelines,
      propsStub.timeline,
      propsStub.timelineName
    );
    expect(options).toEqual([
      { label: 'Session 1', value: 'Session 1' },
      { label: 'Session 2', value: 'Session 2' },
      { label: 'Session 3', value: 'Session 3' },
      { label: '*', value: '*' },
    ]);
  });
  test('TimelineField :: computeTimelineFieldOptions :: non empty timeline', () => {
    const options = computeTimelineFieldOptions(
      propsStub.timelines,
      'timeline',
      propsStub.timelineName
    );
    expect(options).toEqual([
      { label: 'Session 1', value: 'Session 1' },
      { label: 'Session 2', value: 'Session 2' },
      { label: 'timeline', value: 'timeline' },
      { label: 'Session 3', value: 'Session 3' },
      { label: '*', value: '*' },
    ]);
  });
  test('TimelineField :: computeTimelineFieldOptions :: same timeline', () => {
    const options = computeTimelineFieldOptions(
      propsStub.timelines,
      propsStub.timelineName,
      propsStub.timelineName
    );
    expect(options).toEqual([
      { label: 'Session 1', value: 'Session 1' },
      { label: 'Session 2', value: 'Session 2' },
      { label: 'Session 3', value: 'Session 3' },
      { label: '*', value: '*' },
    ]);
  });
  test('TimelineField :: computeTimelineFieldOptions :: same timeline & timelineName as defined timelines', () => {
    const options = computeTimelineFieldOptions(
      propsStub.timelines,
      propsStub.timelines[0].name,
      propsStub.timelines[0].name
    );
    expect(options).toEqual([
      { label: 'Session 1', value: 'Session 1' },
      { label: 'Session 2', value: 'Session 2' },
      { label: '*', value: '*' },
    ]);
  });
});

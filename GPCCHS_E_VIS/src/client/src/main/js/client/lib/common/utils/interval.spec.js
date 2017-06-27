import createInterval from './interval';

describe('utils:interval', () => {
  jest.useFakeTimers();
  test('execute function at each interval', () => {
    const spy = jest.fn();
    const interval = createInterval(spy, 1000);

    expect(spy.mock.calls.length).toBe(0);

    jest.runOnlyPendingTimers();
    expect(spy.mock.calls.length).toBe(1);

    jest.runOnlyPendingTimers();
    expect(spy.mock.calls.length).toBe(2);

    jest.runOnlyPendingTimers();
    expect(spy.mock.calls.length).toBe(3);

    interval.destroy();
  });

  test('do not execute function when interval is paused', () => {
    const spy = jest.fn();
    const interval = createInterval(spy, 1000);

    interval.pause();
    expect(spy.mock.calls.length).toBe(0);
    jest.runOnlyPendingTimers();
    expect(spy.mock.calls.length).toBe(0);
    interval.destroy();
  });

  test('pause, then resume', () => {
    const spy = jest.fn();
    const interval = createInterval(spy, 1000);

    interval.pause();
    jest.runOnlyPendingTimers();
    expect(spy.mock.calls.length).toBe(0);

    interval.resume();
    jest.runOnlyPendingTimers();
    expect(spy.mock.calls.length).toBe(1);
    jest.runOnlyPendingTimers();
    expect(spy.mock.calls.length).toBe(2);
    interval.destroy();
  });

  test('a destroyed timer cannot be resumed', () => {
    const spy = jest.fn();
    const interval = createInterval(spy, 1000);

    interval.destroy();
    interval.resume();

    jest.runOnlyPendingTimers();
    expect(spy.mock.calls.length).toBe(0);
  });

  test('use given callback when resume', () => {
    const spy = jest.fn();
    const unusedSpy = jest.fn();
    const interval = createInterval(unusedSpy, 1000);

    interval.pause();
    interval.resume(spy);

    jest.runOnlyPendingTimers();
    expect(unusedSpy.mock.calls.length).toBe(0);
    expect(spy.mock.calls.length).toBe(1);
    interval.destroy();
  });
  test('cb is called with the delta time between interval', () => {
    const spy = jest.fn((x) => {
      expect(typeof x).toBe('number');
    });
    const interval = createInterval(spy, 1000);
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    interval.destroy();
  });
});

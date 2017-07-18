import createInterval from './interval';

describe('utils:interval', () => {
  jest.useFakeTimers();
  test('execute function at each interval', () => {
    const spy = jest.fn();
    const interval = createInterval(1000, spy);

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
    const interval = createInterval(1000, spy);

    interval.pause();
    expect(spy.mock.calls.length).toBe(0);
    jest.runOnlyPendingTimers();
    expect(spy.mock.calls.length).toBe(0);
    interval.destroy();
  });

  test('pause, then resume', () => {
    const spy = jest.fn();
    const interval = createInterval(1000, spy);

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
    const interval = createInterval(1000, spy);

    interval.destroy();
    interval.resume();

    jest.runOnlyPendingTimers();
    expect(spy.mock.calls.length).toBe(0);
  });

  test('use given callback when resume', () => {
    const spy = jest.fn();
    const interval = createInterval(1000);

    interval.pause();
    interval.resume(spy);

    jest.runOnlyPendingTimers();
    expect(spy.mock.calls.length).toBe(1);
    interval.destroy();
  });
  test('cb is called with the delta time between interval', () => {
    const spy = jest.fn((x) => {
      expect(typeof x).toBe('number');
    });
    const interval = createInterval(1000, spy);
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    interval.destroy();
  });
});

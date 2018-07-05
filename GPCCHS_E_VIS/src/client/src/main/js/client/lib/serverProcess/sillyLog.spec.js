/* eslint-disable no-unused-vars */
import { createSillyLog, getArgsName, decorateWithSillyLog } from './sillyLog';

describe('sillyLog', () => {
  let logger;
  beforeEach(() => {
    logger = {
      stack: [],
      debug: function silly(...args) {
        this.stack.push(args.join(' '));
      },
      warn: function silly(...args) {
        this.stack.push(args.join(' '));
      },
    };
  });

  test('instantiation should log something each time the decorated method is called', () => {
    const sillyLog = createSillyLog(logger);
    const decoratedFunction = sillyLog((tata, yoyo, callback) => {});
    expect(logger.stack).toHaveLength(0);
    decoratedFunction('truc');
    decoratedFunction('chose', 'machin');
    expect(logger.stack).toHaveLength(2);
  });

  it('should log parameters request, removing the last one (callback)', () => {
    const sillyLog = createSillyLog(logger);
    const decoratedFunction = sillyLog((tata, yoyo, callback) => {});
    decoratedFunction('chose', 'machin');
    expect(logger.stack[0]).toEqual(' tata=chose, yoyo=machin');
  });

  it('should log method name if not a lambda', () => {
    function truc(tata, yoyo, callback) {}
    const sillyLog = createSillyLog(logger);
    const decoratedTruc = sillyLog(truc);
    decoratedTruc('chose', 'machin');
    expect(logger.stack[0]).toEqual('truc tata=chose, yoyo=machin');
  });

  it('should log corresponding object attribute if function is a lambda', () => {
    const sillyLog = createSillyLog(logger);
    const dcMock = decorateWithSillyLog({
      requestMasterSession: callback => {},
      requestSessionTime: (sessionId, callback) => {},
    }, sillyLog);
    dcMock.requestMasterSession('chose', 'machin');
    expect(logger.stack[0]).toEqual('requestMasterSession ');
    dcMock.requestSessionTime('chose', 'machin');
    expect(logger.stack[1]).toEqual('requestSessionTime sessionId=chose');
  });

  test('getArgsName with declared function', () => {
    function truc(bidule, machin, /* */ chose, callback) {}
    const args = getArgsName(truc);
    expect(args).toHaveLength(4);
    expect(args[0]).toEqual('bidule');
    expect(args[1]).toEqual('machin');
    expect(args[2]).toEqual('chose');
  });

  test('getArgsName with arrow function', () => {
    const truc = (bidule, machin, chose, callback) => {}
    const args = getArgsName(truc);
    expect(args).toHaveLength(4);
    expect(args[0]).toEqual('bidule');
    expect(args[1]).toEqual('machin');
    expect(args[2]).toEqual('chose');
  });

  test('getArgsName with comments ', () => {
    const truc = (bidule, /* sdfdsfs, */ machin, chose, callback) => {}
    const args = getArgsName(truc);
    expect(args).toHaveLength(4);
    expect(args[0]).toEqual('bidule');
    expect(args[1]).toEqual('machin');
    expect(args[2]).toEqual('chose');
  });
});

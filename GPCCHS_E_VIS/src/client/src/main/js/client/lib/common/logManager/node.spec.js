const isFunction = require('lodash/isFunction');
const isObject = require('lodash/isObject');
const isArray = require('lodash/isArray');

const {
  getStdOptions,
  getLogger,
  createCustomLogger,
} = require('./node');

function initLogger(category, config, callbackOrObjOrArray) {
  let callback;
  if (isArray(callbackOrObjOrArray)) {
    callback = (log) => {
      callbackOrObjOrArray.push(log);
    };
  } else if (isObject(callbackOrObjOrArray)) {
    callback = (log) => {
      Object.assign(callbackOrObjOrArray, log);
    };
  } else if (isFunction(callbackOrObjOrArray)) {
    callback = callbackOrObjOrArray;
  } else {
    throw new Error('Must provide an object, array or function');
  }
  return getLogger(category, config, {
    custom: options => createCustomLogger('custom', (level, msg, meta) =>
      callback && callback({ level, msg, meta }), options),
  });
}

describe('logManager/node', () => {
  test('getStdOptions', () => {
    expect(getStdOptions({
      message: 'foo',
      meta: {
        time: '100',
        pid: 1000,
        pname: 'Test',
        foo: 'bar',
      },
      formatter: () => '',
    })).toEqual({
      message: 'foo +100',
      meta: {
        foo: 'bar',
      },
    });
  });
  test('log', () => {
    const log = {};
    const logger = initLogger('category', 'custom?time=false', log);
    logger.info('one log', { foo: 'bar' });
    expect(log).toEqual({
      level: 'info',
      meta: {
        foo: 'bar',
        pid: process.pid,
        pname: 'NONAME',
      },
      msg: `[NONAME(${process.pid})][category] one log`,
    });
  });
  test('filter on level', () => {
    const log = {};
    const logger = initLogger('category', 'custom?time=false,level=debug', log);
    logger.debug('one log', { foo: 'bar' });
    expect(log).toEqual({
      level: 'debug',
      meta: {
        foo: 'bar',
        pid: process.pid,
        pname: 'NONAME',
      },
      msg: `[NONAME(${process.pid})][category] one log`,
    });
  });
  test('default parameters', () => {
    const log = {};
    const logger = initLogger('category', 'custom', log);
    logger.info('one log', { foo: 'bar' });
    expect(log).toMatchObject({
      meta: {
        foo: 'bar',
        pid: process.pid,
        pname: 'NONAME',
        time: '0ms',
      },
    });
  });
  test('include parameter', () => {
    const logs = [];
    const config = 'custom?process=false,time=false,include=^category$';
    const logger = initLogger('category', config, logs);
    const logger2 = initLogger('category2', config, logs);
    logger.info('log');
    logger2.info('log');
    expect(logs).toEqual([{
      level: 'info',
      meta: {},
      msg: `[NONAME(${process.pid})][category] log`,
    }]);
  });
  test('exclude parameter', () => {
    const logs = [];
    const config = 'custom?process=false,time=false,exclude=^category$';
    const logger = initLogger('category', config, logs);
    const logger2 = initLogger('category2', config, logs);
    logger.info('log');
    logger2.info('log');
    expect(logs).toEqual([{
      level: 'info',
      meta: {},
      msg: `[NONAME(${process.pid})][category2] log`,
    }]);
  });
  test('include and exclude parameter', () => {
    const logs = [];
    const config = 'custom?process=false,time=false,include=^category$,exclude=^category2$';
    const logger = initLogger('category', config, logs);
    const logger2 = initLogger('category2', config, logs);
    logger.info('log');
    logger2.info('log');
    expect(logs).toEqual([{
      level: 'info',
      meta: {},
      msg: `[NONAME(${process.pid})][category] log`,
    }]);
  });
  test('multiple transports with different levels and include parameter', () => {
    const logs = [];
    const config = 'custom?process=false,time=false:custom?process=false,time=false,level=debug,include=^category$';
    const logger = initLogger('category', config, logs);
    const logger2 = initLogger('category2', config, logs);
    logger.debug('log 1');
    logger.info('log 2');
    logger2.debug('log 3');
    expect(logs).toEqual([
      {
        level: 'debug',
        msg: `[NONAME(${process.pid})][category] log 1`,
        meta: {},
      }, {
        level: 'info',
        msg: `[NONAME(${process.pid})][category] log 2`,
        meta: {},
      }, {
        level: 'info',
        msg: `[NONAME(${process.pid})][category] log 2`,
        meta: {},
      },
    ]);
  });
});

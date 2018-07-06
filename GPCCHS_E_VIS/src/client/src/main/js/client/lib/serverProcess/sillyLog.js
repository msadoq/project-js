const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

function getArgsName(func) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  const result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  return result || [];
}

function stringifyArg(arg) {
  return typeof arg === 'object' ? JSON.stringify(arg) : arg;
}

/**
 * @param the logger to sillyLog with
 * @returns a function decorator (Higher Order Function)
 */
const createSillyLog = logger => fn => (...args) => {
  logger.debug(
    fn.name,
    getArgsName(fn)
      .slice(0, -1)
      .map((argName, index) => `${argName}=${stringifyArg(args[index])}`)
      .join(', ')
  );
  return fn.apply(this, args);
};

/**
 *
 * @param dcMap - the object whose attributes will be decorated
 * @param sillyLog - the logger in charge of logging each call to the decorated methods
 * @param excludedFromDecoration - the attributes to exclude from decoration
 * @returns the dcMap parameter with its methods decorated
 */
function decorateWithSillyLog(dcMap, sillyLog, excludedFromDecoration = []) {
  const result = dcMap
    ? Object.keys(dcMap).map(key => [key, dcMap[key]]) // Object.entries
      .filter(([key, fn]) => excludedFromDecoration.indexOf(key) === -1) // remove those to exclude
      .map(([key, fn]) => [key, sillyLog(fn)])
      .reduce((acc, [key, decoratedFn]) => {
        acc[key] = decoratedFn;
        return acc;
      }, dcMap) // rebuild dcMap, overriding methods to sillyLog
    : dcMap;

  return result;
}

module.exports = {
  createSillyLog,
  getArgsName,
  decorateWithSillyLog,
};

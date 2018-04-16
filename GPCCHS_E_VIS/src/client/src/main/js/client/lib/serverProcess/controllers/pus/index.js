import encoding from 'text-encoding';

const logger = require('../../../common/logManager')('controllers/PUS/utils');

const decoder = new encoding.TextDecoder();

module.exports = function pusController() {
/**
 * Workaround: under the hood ES6 transpilation to ES5 replace rest operator with a .apply() call
 * a known issue cause a 'Maximum call stack size exceeded' when function receives thousands of
 * arguments.
 *
 * source: https://stackoverflow.com/questions/42263108/why-does-apply-with-too-many-arguments-throw-maximum-call-stack-size-exceeded
 */
  // eslint-disable-next-line prefer-rest-params, "DV6 TBC_CNES LPISIS Avoid 'Maximum call stack size exceeded' with rest operators and .apply() usage"
  const args = arguments;
  const data = Object.keys(args).map(key => args[key]);
  data.forEach((param) => {
    logger.info(decoder.decode(param));
  });
};

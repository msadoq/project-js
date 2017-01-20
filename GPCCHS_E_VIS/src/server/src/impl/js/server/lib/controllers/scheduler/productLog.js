const fs = require('fs');
const lockfile = require('lockfile');
const path = require('path');
const _ = require('lodash/fp');
const _async = require('async');
const {
  MESSAGETYPE_LOG_SEND,
  LOG_DIST_FILENAME,
  LOG_DIST_LOCK_STALE,
} = require('common/constants');
const { encode } = require('common/protobuf');
const logger = require('common/log')('controllers:scheduler:productLog');
const readline = require('readline');

const withArgs = (line, obj) => (
  line.indexOf(' ') >= 0 ?
    _.assoc(
      'args',
      JSON.parse(
        line.substr(line.indexOf(' '))
      )
    )(obj) : obj
  );

const deserializeLog = line => _.pipe(
  _.split(' '),
  _.get('0'),
  uid => ({ uid }),
  obj => withArgs(line, obj)
)(line);


const sendLog = (pushToDc, uid, args) => {
  pushToDc([
    encode('dc.dataControllerUtils.Header', { messageType: MESSAGETYPE_LOG_SEND }),
    encode('dc.dataControllerUtils.String', { string: _.uniqueId('log_') }),
    encode('dc.dataControllerUtils.SendLog', {
      uid,
      arguments: args,
    }),
  ]);
};

const processLog = (pushToDc, scheduleJob) => {
  const LOG_PATH = path.join(process.env.LOG_DIR, LOG_DIST_FILENAME);
  const LOCK_PATH = `${LOG_PATH}.lock`;

  let lineReadCpt = 0;
  _async.waterfall([
    cb => lockfile.lock(LOCK_PATH, { stale: LOG_DIST_LOCK_STALE }, () => cb()),
    (cb) => {
      const lineReader = readline.createInterface({
        input: fs.createReadStream(LOG_PATH),
      });

      lineReader.on('line', (line) => {
        const { uid, args } = deserializeLog(line);
        sendLog(pushToDc, uid, args);
        lineReadCpt += 1;
      });
      cb(null, lineReader);
    },
    (lineReader, cb) => lineReader.on('close', () => cb()),
    cb => fs.truncate(LOG_PATH, 0, () => cb()),
    cb => lockfile.unlock(LOCK_PATH, () => cb()),
    (cb) => {
      logger.verbose(`pushed ${lineReadCpt} logs to DC`);
      cb();
    },
  ], scheduleJob);
};

module.exports = processLog;

module.exports = Object.assign(module.exports, {
  deserializeLog,
});

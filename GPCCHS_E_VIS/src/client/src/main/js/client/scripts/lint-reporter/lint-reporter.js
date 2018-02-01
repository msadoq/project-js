// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move lint-reporter in scripts/ folder
// END-HISTORY
// ====================================================================

const _ = require('lodash/fp');
const async = require('async');
const { writeFileSync } = require('fs');
const { resolve, basename } = require('path');
const { spawn } = require('child_process');

const { log } = console;

const CLIENT_FOLDER = resolve(__dirname, '../..');
const COMMON_FOLDER = resolve(CLIENT_FOLDER, '../../../../../common/src/main/js/common');

const ESLINT = 'eslint';
const ESLINT_ARGS = '. -f json'.split(' ');
const ESLINT_ARGS_WITH_RELAX = '. -f json --no-inline-config'.split(' ');

const OUTPUT_CSV_FILE_ALL = resolve(__dirname, 'lint-report-all.csv');
const OUTPUT_CSV_FILE = resolve(__dirname, 'lint-report.csv');

const execEslint = withRelaxed => (cwd, cb) => {
  const args = withRelaxed ? ESLINT_ARGS_WITH_RELAX : ESLINT_ARGS;
  const result = [];
  const child = spawn(ESLINT, args, { cwd, silent: true });
  child.stdout.on('data', (data) => {
    result.push(data);
  });
  child.on('close', () => {
    log(`lint ${basename(cwd)} ${withRelaxed ? '(+ relaxed)' : ''}`);
    if (result.length) {
      return cb(null, JSON.parse(result.join('')));
    }
    return cb(null, []);
  });
};
const hasNoErrors = _.allPass([
  _.propEq('errorCount', 0),
  _.propEq('warningCount', 0),
]);

const otherwise = _.always(true);

const getSeverity = _.cond([
  [_.equals(1), _.always('warning')],
  [_.equals(2), _.always('error')],
  [otherwise, _.always('unknown')],
]);

const getRelaxed = relaxed => (relaxed ? 'Yes' : 'No');

const formatMessageToCSV = ({ severity, message, ruleId, line, column, filePath, relaxed }) => (
  `${filePath}; ${getSeverity(severity)}; ${message}; ${ruleId}; ${line}; ${column}; ${getRelaxed(relaxed)}`
);

const prepend = _.concat;

const getLintMessages = ({ withRelax }, cb) => {
  async.map([CLIENT_FOLDER, COMMON_FOLDER], execEslint(withRelax), (err, res) => {
    if (err) {
      return cb(err);
    }
    return cb(null,
        _.pipe(
          _.flatten,
          _.reject(hasNoErrors),
          _.flatMap(lintReport => (
            _.map(_.set('filePath', lintReport.filePath), lintReport.messages)
          ))
      )(res)
    );
  });
};

const createCSV = _.pipe(
  _.map(formatMessageToCSV),
  prepend('file; severity; error; eslint rule; line; column; relaxed'),
  _.join('\n')
);
const diffLintReport = _.differenceBy(formatMessageToCSV);

log('creating lint reports...');
getLintMessages({ withRelax: false }, (err, reportWithoutRelax) => {
  getLintMessages({ withRelax: true }, (errWithRelax, completeReport) => {
    const reportWithRelax = diffLintReport(completeReport, reportWithoutRelax);

    const messagesRelaxed = _.map(_.set('relaxed', true), reportWithRelax);
    const messagesNoRelaxed = _.map(_.set('relaxed', false), reportWithoutRelax);
    const allMessages = _.concat(messagesNoRelaxed, messagesRelaxed);

    writeFileSync(OUTPUT_CSV_FILE, createCSV(messagesNoRelaxed));
    log(`write ${OUTPUT_CSV_FILE}`);

    writeFileSync(OUTPUT_CSV_FILE_ALL, createCSV(allMessages));
    log(`write ${OUTPUT_CSV_FILE_ALL}`);
  });
});

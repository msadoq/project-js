const _ = require('lodash/fp');
const async = require('async');
const { writeFileSync } = require('fs');
const { resolve, basename } = require('path');
const { spawn } = require('child_process');

const { log } = console;

const CLIENT_FOLDER = resolve(__dirname, '..');
const COMMON_FOLDER = resolve(CLIENT_FOLDER, '../../../../../common/src/main/js/common');

const ESLINT = 'eslint';
const ESLINT_ARGS = '. -f json'.split(' ');
const ESLINT_ARGS_NO_RELAX = '. -f json --no-inline-config'.split(' ');

const OUTPUT_CSV_FILE_NO_RELAX = resolve(__dirname, 'lint-report-no-relax.csv');
const OUTPUT_CSV_FILE = resolve(__dirname, 'lint-report.csv');

const execEslint = relax => (cwd, cb) => {
  const args = relax ? ESLINT_ARGS : ESLINT_ARGS_NO_RELAX;
  const result = [];
  const child = spawn(ESLINT, args, { cwd, silent: true });
  child.stdout.on('data', (data) => {
    result.push(data);
  });
  child.on('close', () => {
    log(`lint ${basename(cwd)} ${relax ? '' : '(no relax)'}`);
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

const formatMessageToCSV = lintError => _.map(({ severity, message, ruleId, line, column }) => (
  `${lintError.filePath}; ${getSeverity(severity)}; ${message}; ${ruleId}; ${line}; ${column}`
), lintError.messages);

const prepend = _.concat;

const createCSV = ({ relax }) => {
  async.map([CLIENT_FOLDER, COMMON_FOLDER], execEslint(relax), (err, res) => {
    const csvLintErrors = _.pipe(
      _.flatten,
      _.reject(hasNoErrors),
      _.flatMap(formatMessageToCSV),
      prepend('file; severity; error; eslint rule; line; column'),
      _.join('\n')
    )(res);
    const outputPath = relax ? OUTPUT_CSV_FILE : OUTPUT_CSV_FILE_NO_RELAX;
    writeFileSync(outputPath, csvLintErrors);
    log(`-> file '${basename(outputPath)}' created`);
  });
};

log('creating lint reports...');
createCSV({ relax: true });
createCSV({ relax: false });

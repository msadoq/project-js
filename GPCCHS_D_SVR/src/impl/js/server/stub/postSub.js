const debug = require('../lib/io/debug')('stub:postSub');
const parseArgs = require('minimist');

const usage = () => console.log(
  'node postSub.js [ -h | --help ] ',
  '[ -t | --type TYPE ("rep" by default | "agg" | "fds") ] ',
  '[ -p | --parameter PARAM ("1" by default | "2" | "3" | "FDS") ]',
  '[ -f | --field FIELD ("1" by default | "2" | "3" ) ]',
  '[ -s | --start TIMESTAMP (in ms, 1420675200000 by default) ]',
  '[ -e | --end TIMESTAMP (in ms) ]',
  '[ -l | --length NB OF DAYS SINCE START (ignored if -e is setted, 1 by default) ]',
  '[ -w | --wait TIME (in ms, 0 by default) ]',
  '[ --filter / --no-filter (switch the use of a fixed filter) ]'
);

const TYPES = {
  rep: 'ReportingParameter',
  agg: 'Aggregation',
  fds: 'FdsData',
};

const PARAMETERS = {
  1: 'ATT_BC_STR1VOLTAGE',
  2: 'ATT_BC_STR1STRSAQ0',
  3: 'ATT_BC_STR1STRSAQ1',
  4: 'ATT_BC_STR1STRSAQ2',
  FDS: 'FDS_DATA',
};

const FIELDS = {
  1: 'rawValue',
  2: 'onBoardDate',
};

const LENGTH_OF_DAY = 86400000;
const STARTVALUE = 1420675200000;

const options = {
  boolean: ['h', 'filter'],
  strings: ['p', 't', 'f'],
  default: {
    h: false,
    filter: true,
    p: Object.keys(PARAMETERS)[0],
    t: Object.keys(TYPES)[0],
    f: Object.keys(FIELDS)[0],
    s: STARTVALUE,
    l: 1,
    w: 0,
  },
  alias: {
    h: 'help',
    p: 'parameter',
    t: 'type',
    f: 'field',
    s: 'start',
    l: 'length',
    e: 'end',
    w: 'wait',
  },
};

const argv = parseArgs(process.argv.slice(2), options);
if (argv.help
  || typeof argv.start !== 'number'
  || typeof argv.length !== 'number'
  || (typeof argv.end !== 'undefined' && typeof argv.end === 'number')
  || typeof argv.wait !== 'number'
) {
  usage();
  process.exit(1);
}
if (typeof argv.end === 'undefined') {
  argv.end = argv.start + argv.length * LENGTH_OF_DAY;
}



/*let type = null;
let paramType = null;
let day = 'default';
let length = 1;*/

const visuWindow = {
  lower: argv.start,
  upper: argv.end,
};

/*if (process.argv[2] in types) {
    type = types[process.argv[2]];
    if (type === 'FdsData') paramType = 'FDS_DATA'
    else paramType = paramTypes[process.argv[5]];
    if (process.argv[3] in days) {
        day = process.argv[3];
        visuWindow.lower = startValue + days[day]*lengthOfDay;
        if (!isNaN(parseInt(process.argv[4], 10))) {
            length = parseInt(process.argv[4], 10);
        }
        visuWindow.upper = visuWindow.lower + length*lengthOfDay;
        if (visuWindow.upper < visuWindow.lower) [visuWindow.lower, visuWindow.upper] = [visuWindow.upper, visuWindow.lower];
    }
}*/

const jsonData = {
  dataFullName: `Reporting.${PARAMETERS[argv.parameter]}<${TYPES[argv.type]}>`,
  field: FIELDS[argv.field],
  domainId: 0,
  timeLineType: 'session',
  sessionId: 1,
  setFileName: '',
  subscriptionState: 'play',
  visuSpeed: 0,
  visuWindow,
};

const filter = [
  {
    dataFullName: `Reporting.${PARAMETERS[argv.parameter]}<${TYPES[argv.type]}>`,
    field: FIELDS[argv.field],
    operator: 'OP_GT',
    value: 25,
  }, {
    dataFullName: `Reporting.${PARAMETERS[argv.parameter]}<${TYPES[argv.type]}>`,
    field: FIELDS[argv.field],
    operator: 'OP_LT',
    value: 75,
  },
];

if (argv.filter) {
  debug.info(`Field ${FIELDS[argv.field]} from parameter ${PARAMETERS[argv.parameter]} of type ${TYPES[argv.type]} from ${visuWindow.lower} to ${visuWindow.upper} with filters`);
  jsonData.filter = filter;
} else {
  debug.info(`Field ${FIELDS[argv.field]} from parameter ${PARAMETERS[argv.parameter]} of type ${TYPES[argv.type]} from ${visuWindow.lower} to ${visuWindow.upper} with no filter`);
}

const postData = JSON.stringify(jsonData);

const { postRequest, writeData } = require('./utils/restApi');
const route = '/api/subscriptions';
const postReq = postRequest('127.0.0.1', 1337, route);


setTimeout(() => {
  writeData(postReq, postData);
}, argv.wait);

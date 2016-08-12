const debug = require('../lib/io/debug')('stub:gpccdc');
const zmq = require('zmq');
const parseArgs = require('minimist');

const { newReportingParameter, newMetaData } = require('./utils/types.js');

const usage = () => console.log('USAGE: node gpccds.js [ -h | --help ] [ -p PERIOD (in ms) | --periodicity PERIOD (in ms) ] [ -t TIMESTEP (in ms) | --timestep TIMESTEP (in ms) ]');

const TIMESTEP = 600000;
const PERIODICITY = 50;
const STEP = 1000;

const options = {
  boolean: 'h',
  default: {
    h: false,
    p: PERIODICITY,
    t: TIMESTEP,
  },
  alias: {
    h: 'help',
    p: 'periodicity',
    t: 'timestep',
  },
};

const argv = parseArgs(process.argv.slice(2), options);
if (argv.h) {
  usage();
  process.exit(1);
}

const dcPushPort = 49159;
const subPullPort = 4000;
const dcPushSocket = zmq.socket('push');
const subPullSocket = zmq.socket('pull');
const URI = 'tcp://127.0.0.1';

const onSubscription = (subscription, dataSent = 0) => {
  const newSubscription = Object.assign({}, subscription);
  let newDataSent = dataSent;
  const timestamp = newSubscription.visuWindow.lower;
  const max = newSubscription.visuWindow.upper;

  if (timestamp < max) {
    const parameter = newReportingParameter(timestamp);
    const metaData = newMetaData(newSubscription, timestamp);
    debug.debug(`Sending data on timestamp ${timestamp}`);
    dcPushSocket.send([null, metaData, parameter]);
    newSubscription.visuWindow.lower = timestamp + argv.timestep;
    if (newDataSent % STEP === 0) debug.info(`Already ${newDataSent} data sent for subscription ${newSubscription.subId}`);
    newDataSent++;
    setTimeout(() => onSubscription(newSubscription, newDataSent), argv.periodicity);
  } else {
    debug.info(`Data Providing Done. ${newDataSent} data sent for subscription ${newSubscription.subId}`);
  }
};


const onSubscriptions = (subscriptions) => {
  debug.info('Receive new subscriptions');
  JSON.parse(subscriptions).forEach((subscription) => {
    debug.debug(`Manage subscription ${subscription}`);
    onSubscription(subscription);
  });
};


debug.info(`Binding Dc Push Socket on ${URI}:${dcPushPort}`);
dcPushSocket.bind(`${URI}:${dcPushPort}`, (err) => {
  if (err) throw err;
  debug.info(`Dc Push Socket Bound on ${URI}:${dcPushPort}`);
  subPullSocket.connect(`${URI}:${subPullPort}`);
  debug.info(`Subscription Pull socket${URI}:${subPullPort}`);

  subPullSocket.on('message', onSubscriptions);
});

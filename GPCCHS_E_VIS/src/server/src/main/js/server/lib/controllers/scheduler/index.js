const zmq = require('common/zmq');
const logger = require('common/log')('controllers:scheduler');

const pushToDc = args => zmq.push('dcPush', args);

let jobsRunning = false;

// List of scheduled jobs
const jobs = [
  // { name: 'PRODUCT_LOG', job: productLog, frequency: HSC_LOG_FREQUENCY },
];

const runJob = (job, scheduleJob, name) => () => {
  job(pushToDc, scheduleJob);
  logger.silly(`run job ${name}`);
};

// Start all jobs
const start = () => {
  jobsRunning = true;

  jobs.forEach(({ job, frequency, name }) => {
    const scheduleJob = () => {
      if (jobsRunning) {
        setTimeout(runJob(job, scheduleJob, name), frequency);
      }
    };
    scheduleJob();
  });

  logger.info('all jobs are triggered');
};

// Stop all jobs
const stop = () => {
  jobsRunning = false;
  logger.info('all jobs are stopped');
};

module.exports = {
  start,
  stop,
};

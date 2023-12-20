require('dotenv').config();

const Args = process.argv.slice(2);
const Bull = require('bull');
const Ulid = require('ulid');

const redisOptions = {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  },
};

let queueName = 'default';
const getName = String(Args[0]);
if (getName !== 'undefined') {
  queueName = getName;
}

let queueData = '{"field": "data","single_job": 1}';
const getData = String(Args[1]);
if (getData !== 'undefined') {
  queueData = getData;
}

const jsonQueueData = JSON.parse(queueData);
const queue = new Bull(queueName, redisOptions);

queue.add(
    'process',
    jsonQueueData,
    {
      removeOnComplete: 100,
      attempts: 2,
      backoff: 5000,
      jobId: Ulid.ulid(),
    },
).then(
    () => {
      queue.close();
      console.log(`sending one job to ${queueName} queue`);
      process.exit();
    },
);

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

let amountData = 2;
const getAmount = Number(Args[1]);
if (getAmount !== 'undefined' && getAmount > 0) {
  amountData = getAmount;
}

let queueData = '{"field": "data","single_job": 1}';
const getData = String(Args[2]);
if (getData !== 'undefined') {
  queueData = getData;
}

const jsonQueueData = JSON.parse(queueData);

console.log(`sending ${amountData} jobs to ${queueName} queue`);

(async () => {
  const queue = new Bull(queueName, redisOptions);

  for (let i = 0; i < amountData; i++) {
    await queue.add('process', jsonQueueData, {
      removeOnComplete: 100,
      attempts: 3,
      backoff: 1000,
      jobId: Ulid.ulid(),
    });
  }
  queue.close();
})();

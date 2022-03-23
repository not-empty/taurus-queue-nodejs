const Bull = require('bull');
const Ulid = require('ulid');

const queue = new Bull('test');

queue.add(
    'process',
    {
      field: 'data',
      another_field: 123,
    },
    {
      removeOnComplete: 100,
      attempts: 2,
      backoff: 5000,
      jobId: Ulid.ulid(),
    },
).then(() => {
  queue.close();
  console.log('single job');
  process.exit();
});

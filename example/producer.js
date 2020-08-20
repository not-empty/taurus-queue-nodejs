var Bull = require('bull');
var Ulid = require('ulid');

var queue = new Bull('test');

queue.add(
  'process',
  {
    field: 'data',
    another_field: 123,
  },
  {
    removeOnComplete: 100,
    attempts: 1,
    backoff: 1000,
    jobId: Ulid.ulid(),
  }
).then(() => {
  queue.close();
  console.log('single job');
  process.exit();
});

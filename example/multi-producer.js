const Args = process.argv.slice(2);
const Bull = require('bull');
const Ulid = require('ulid');

const qtde = Number(Args[0]) || 1;

const queueData = [
  {
    field: 'data',
    another_field: 1,
  },
];

(async () => {
  const queue = new Bull('test');
  for (let i = 0; i < qtde; i++) {
    await queue.add(
        'process',
        queueData[0],
        {
          removeOnComplete: 100,
          attempts: 3,
          backoff: 1000,
          jobId: Ulid.ulid(),
        },
    );

    queueData[0].another_field += 1;
  }
  queue.close();
})();

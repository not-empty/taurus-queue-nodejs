const Bull = require('bull');
const configQueue = require('../config/queue');
const ulid = require('ulid');

class PushQueue {
  constructor() {
    this.options = {
      redis: {
        host: configQueue.redisHost,
        port: configQueue.redisPort,
        maxRetriesPerRequest: configQueue.redisMaxRetriesPerRequest,
        enableReadyCheck: configQueue.redisEnableReadyCheck,
      },
    };
  }

  async push(
      queueName,
      data,
      options = {},
  ) {
    const queue = new Bull(
        queueName,
        this.options,
    );

    data.taurus_fallback = true;
    await queue.add(
        'process',
        data,
        {
          removeOnComplete: configQueue.removeOnComplete,
          attempts: configQueue.attempts,
          backoff: configQueue.backoff,
          jobId: ulid.ulid(),
          ...options,
        },
    );
    await queue.close();
  }

  async schedule(
      queueName,
      data,
      time,
  ) {
    const queue = new Bull(
        queueName,
        this.options,
    );

    await queue.add(
        'process',
        data,
        {
          delay: time,
          removeOnComplete: configQueue.removeOnComplete,
          attempts: configQueue.attempts,
          backoff: configQueue.backoff,
          jobId: ulid.ulid(),
        },
    );

    await queue.close();
  }
}

module.exports = PushQueue;

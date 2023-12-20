const Bull = require('bull');

class Queue {
  constructor(
      queueName,
      configQueue,
      log,
      workerId,
  ) {
    const options = {
      redis: {
        host: configQueue.redisHost,
        port: configQueue.redisPort,
        maxRetriesPerRequest: configQueue.redisMaxRetriesPerRequest,
        enableReadyCheck: configQueue.redisEnableReadyCheck,
      },
    };

    const queue = new Bull(
        queueName,
        options,
    );

    queue.on('error', (error) => {
      log.show(
          'red',
          `Worker: ${workerId} - Queue ${queue.name} - error: ${error}`,
      );

      if ('response' in error) {
        log.debug(
            error.response.data,
        );
      }

      log.debug(
          error,
      );
    });

    queue.on('failed', (job, error) => {
      const msg = `failed: ${error}`;
      log.show(
          'red',
          `Worker: ${workerId} - Queue ${queue.name} - Job ${job.id} ${msg}`,
      );

      if ('response' in error) {
        job.log(JSON.stringify(error.response.data));

        log.debug(
            error.response.data,
        );

        return;
      }

      job.log(JSON.stringify(error));
      log.debug(
          error,
      );
    });

    return queue;
  }
}

module.exports = Queue;

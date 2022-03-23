const PushQueue = require('../core/push-queue');
const {fallback, attempts} = require('../config/queue');

/**
 * Base business class.
 * We recommend keeping this class for possible use int the future.
 */
class BaseBusiness {
  /**
   * Send job to fallback queue.
   * @param {object} job
   * @param {Log} log
   * @param {number} workerId
   * @param {object} error
   * @return {void}
   */
  async sendToFallback({
    job,
    log,
    workerId,
    error,
  }) {
    if (!this.shouldSendToFallback(job)) {
      throw error;
    }

    const pushQueue = new PushQueue();

    log.show(
        'cyan',
        `Worker: ${workerId} - ${job.id} - Send job to fallback queue`,
    );

    await pushQueue.push(
        fallback.queueName,
        job.data,
        {
          attempts: fallback.attempts,
          backoff: fallback.backoff,
        },
    );
  }

  /**
   * Check whether job should be sent to fallback or not.
   * @param {object} job
   * @return {bool}
   */
  shouldSendToFallback(job) {
    if (!fallback.enabled) {
      return false;
    }
    if (job.data.taurus_fallback) {
      return false;
    }

    const jobAttempts = job.attemptsMade + 1;

    return jobAttempts >= attempts;
  }
}

module.exports = BaseBusiness;

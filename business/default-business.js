const BaseBusiness = require('./base-business');

/**
 * Example bussines job processor
 */
class DefaultBusiness extends BaseBusiness {
  /**
   * @param {object} job
   * @param {Log} log
   * @param {number} workerId
   * @return {void}
   */
  async process({
    job,
    log,
    workerId,
  }) {
    try {
      log.show(
          'yellow',
          `Worker: ${workerId} - ${job.id} - Start job`,
      );

      log.debug(
          job.data,
      );

      // your actions and rules here

      log.show(
          'yellow',
          `Worker: ${workerId} - ${job.id} - Finish job`,
      );
    } catch (error) {
      return this.sendToFallback({
        job,
        log,
        workerId,
        error,
      });
    }
  }
}

module.exports = DefaultBusiness;

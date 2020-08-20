/**
 * Example bussines job processor
 */
class TestBusiness {
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
    log.show(
      'yellow',
      `Worker: ${workerId} - ${job.id} - Start job`,
    );

    log.debug(
      job.data,
    );

    log.show(
      'yellow',
      `Worker: ${workerId} - ${job.id} - Finish job`,
    );
  }
}

module.exports = TestBusiness;

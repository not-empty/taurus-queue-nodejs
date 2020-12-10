const constructors = require('../config/constructor');
const fs = require('fs');

class Validate {
  constructor(log, queueName) {
    this.constructors = constructors;
    this.queueName = queueName;
    this.log = log;
  }

  async isValidQueueName() {
    if (typeof this.queueName == 'string' &&
      !this.queueName.trim()
    ) {
      this.log.show(
        'red',
        'Unable to start: Empty queue name'
      );
      process.exit(1);
    }
    if (this.queueName == 'undefined') {
      this.log.show(
        'red',
        'Unable to start: Missing queue name'
      );
      process.exit(1);
    }
  }

  async hasBusinessInConstructor() {
    if (!(this.queueName in constructors)) {
      this.log.show(
        'red',
        `Unable to start: Missing ${this.queueName} business in constructors`
      );
      process.exit(1);
    }
  }
}
module.exports = Validate;

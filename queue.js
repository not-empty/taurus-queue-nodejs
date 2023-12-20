require('dotenv').config();

const DateTime = require('./app/date-time.js');
const Log = require('./app/log.js');
const Queue = require('./core/queue');
const Validate = require('./app/validate');

const colors = require('./app/colors.js');
const configQueue = require('./config/queue');
const version = require('./config/version');
const ParamsQueue = require('./core/params-queue');

const params = new ParamsQueue();
const dateTime = new DateTime();

const log = new Log(
    dateTime,
    colors,
    params.debugMode,
);

const validate = new Validate(log, params.queueName);

let constructors = {};
let queue = null;
let queueName = '';

const validations = [
  validate.isValidQueueName(),
  validate.hasBusinessInConstructor(),
];

log.debug(
    'Running on debug mode :)>>',
);
log.show(
    'bright',
    `Starting Taurus Queue ${version.version} ...`,
);

process.on('unhandledRejection', (reason, position) => {
  log.show(
      'red',
      `Unhandled Rejection at ${position} reason: ${reason}...`,
  );
  process.exit(1);
});

const workerId = 1;

Promise.all(validations)
    .then(() => {
      queueName = validate.queueName;
      queue = new Queue(
          queueName,
          configQueue,
          log,
          workerId,
      );

      log.show(
          'yellow',
          `Active queue: ${queueName}`,
      );
      constructors = validate.constructors;
    }).then(() => {
      const business = new constructors[queueName]();
      queue.process(
          'process',
          async (job) => business.process({
            job,
            log,
            workerId,
          }),
      );
    });

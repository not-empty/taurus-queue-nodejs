var Redis = require('ioredis');

module.exports = {
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: Number(process.env.REDIS_PORT) || 6379,
  redisMaxRetriesPerRequest: process.env.REDIS_MAX_RETRIES || null,
  redisEnableReadyCheck: Number(process.env.REDIS_READY_CHECK) || 0,
  removeOnComplete: Number(process.env.TAURUS_REMOVE_ON_COMPLETE) || 100,
  attempts: Number(process.env.TAURUS_ATTEMPTS) || 3,
  backoff: Number(process.env.TAURUS_BACKOFF) || 30000,
  createClient: function (type) {
    switch (type) {
      case 'client':
        return client;
      case 'subscriber':
        return subscriber;
      case 'bclient':
        return new Redis(process.env.REDIS_HOST);
      default:
        throw new Error('Unexpected connection type: ', type);
    }
  }
};

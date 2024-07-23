const Redis = require('ioredis');
const configRedis = require('../config/redis');

class CheckCompletion {
  constructor() {
    this.options = {
      host: configRedis.auxRedisHost,
      port: configRedis.auxRedisPort,
    };

    this.redis = null;
  }

  async setInitialJobCounter(
      key,
      value,
  ) {
    const redis = this.newRedis();
    const result = await redis.set(key, value);

    console.log(`Job counter key: ${key}, increased, total jobs: ${value}`);

    return result;
  }

  async decrement(
      key,
  ) {
    const redis = this.newRedis();
    const luaScript = `
      local count = redis.call('DECR', KEYS[1])
      return count
    `;

    const result = await redis.eval(luaScript, 1, key);

    if (result === 0) {
      console.log('Last job completed.');
      await redis.del(key);

      return result;
    }

    console.log(`Jobs remaining: ${result}`);
    return result;
  }

  newRedis() {
    if (this.redis) {
      return this.redis;
    }

    this.redis = new Redis(
        this.options,
    );

    return this.redis;
  }
}

module.exports = CheckCompletion;

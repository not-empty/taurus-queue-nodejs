const Redis = require('ioredis');
const configRedis = require('../config/redis');

class CheckCompletion {
  constructor() {
    this.options = {
        host: configRedis.auxRedisHost,
        port: configRedis.auxRedisPort,
    };
  }

  async increment(
      key
  ) {
    const redis = new Redis(
        this.options,
    );

    const result = await redis.incr(key);
    console.log(`Job counter key: ${key}, increased, total jobs: ${result}`);

    await redis.disconnect();
    return result;
  }

  async decrement(
    key
  ) {
    const redis = new Redis(
      this.options,
    );
    const luaScript = `
        local count = redis.call('DECR', KEYS[1])
        return count
    `;

    const result = await redis.eval(luaScript, 1, key);
    if (result === 0) {
        console.log('Last job completed.');
        await redis.del(key);
    } else {
        console.log(`Jobs remaining: ${result}`);
    }
    return result;
  }
}

module.exports = CheckCompletion;

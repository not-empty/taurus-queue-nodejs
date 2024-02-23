module.exports = {
  auxRedisHost: process.env.AUX_REDIS_HOST || 'localhost',
  auxRedisPort: Number(process.env.AUX_REDIS_PORT) || 6379,
};

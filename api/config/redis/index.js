import * as redis from 'redis';
import { promisify } from 'util';
import retryStrategy from './retry';

import env from 'dotenv';
env.config();

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisPassword = process.env.REDIS_PASSWORD;


// Prod
const client = redis.createClient({
  url: 'redis://'+redisHost,
  host: redisHost,
  port: redisPort,
  password: redisPassword,
  no_ready_check: true,
  retry_strategy: retryStrategy(),
});

// Disable client's AUTH command.
client['auth'] = null;

client.on('error', (err) => {
  console.log('Error do redis: ', err);
});

client.on('ready', () => {
  console.log('Redis is ready');
});

client.on('connect', () => {
  console.log('Redis is connected');
});

client.on('reconnecting', function (o) {
  console.log('Redis client reconnecting', o.attempt, o.delay);
});

//debug
client.on('message', function (channel, key) {
  console.log('message', key, channel);
});
//debug

client.connect();


export default client;
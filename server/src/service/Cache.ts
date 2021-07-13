const redis = require('redis');
import { REDIS } from '../config';

class Cache {
  client;
  constructor() {
    this.client = redis.createClient(REDIS.REDIS_URL);
  }

  async set(options: { userId?: any; traits?: any }) {
    let properties = await this.get(options.userId.toString());
    properties = { properties, ...options.traits };
    this.client.set(options.userId.toString(), JSON.stringify(properties));
  }

  async get(userId: { toString: () => any }) {
    return new Promise((resolve, reject) => {
      this.client.get(userId.toString(), (err: Error, data: string) => {
        if (data === null) resolve({});
        resolve(JSON.parse(data));
      });
    });
  }

  async flush() {
    await this.client.flushall('ASYNC');
  }
}

module.exports = Cache;

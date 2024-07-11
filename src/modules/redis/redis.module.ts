import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

import { Config, RedisConfig } from '../../configs/config.type';
import { RedisService } from './reidis.service';

const redisProvider = {
  provide: 'REDIS_PROVIDER',
  useFactory: (configService: ConfigService<Config>) => {
    const redisConfig = configService.get<RedisConfig>('redis');
    return new Redis({
      host: redisConfig.host,
      password: redisConfig.password,
      port: redisConfig.port,
    });
  },
  inject: [ConfigService],
};
@Module({
  imports: [],
  controllers: [],
  providers: [redisProvider, RedisService],
  exports: [RedisService],
})
export class RedisModule {}

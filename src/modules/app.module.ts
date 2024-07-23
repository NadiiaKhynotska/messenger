import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ReferrerPolicyInterceptor } from '../common/interseptors/referrer-policy-interseptor';
import configuration from '../configs/config';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { MessageModule } from './messege/messge.module';
import { PostgresModule } from './postgres/postgres.module';
import { RedisModule } from './redis/redis.module';
import { RepositoryModule } from './repository/repository.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PostgresModule,
    AuthModule,
    RedisModule,
    HealthModule,
    UserModule,
    MessageModule,
    RepositoryModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ReferrerPolicyInterceptor,
    },
  ],
})
export class AppModule {}

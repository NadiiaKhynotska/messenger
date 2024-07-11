import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/config';
import { HealthModule } from './health/health.module';
import { PostgresModule } from './postgres/postgres.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PostgresModule,
    HealthModule,
    UserModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

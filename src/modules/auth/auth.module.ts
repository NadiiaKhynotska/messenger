import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { RedisModule } from '../redis/redis.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtGuard } from './guards/jwt.guard';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache.service';
import { TokenService } from './services/token.service';

@Module({
  controllers: [AuthController],
  imports: [JwtModule, RedisModule, UserModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    AuthService,
    AuthCacheService,
    TokenService,
  ],
  exports: [AuthCacheService],
})
export class AuthModule {}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { SKIP_AUTH } from '../constants/constants';
import { TokenType } from '../enums/token-type.enum';
import { AuthCacheService } from '../services/auth-cache.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
    private authCacheService: AuthCacheService,
    private userRepository: UserRepository,
    private refreshRepository: RefreshTokenRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;

    const request = context.switchToHttp().getRequest();
    const token = request.get('Authorization')?.split('Bearer ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }

    let tokenType: TokenType;
    let payload;

    // Перевіряємо токен як Access Token
    try {
      payload = await this.tokenService.verifyToken(token, TokenType.ACCESS);
      tokenType = TokenType.ACCESS;
    } catch (e) {
      // Якщо не вдалось перевірити Access Token, пробуємо як Refresh Token
      payload = await this.tokenService.verifyToken(token, TokenType.REFRESH);
      tokenType = TokenType.REFRESH;
    }

    if (!payload) {
      throw new UnauthorizedException();
    }

    if (tokenType === TokenType.ACCESS) {
      const findTokenInRedis = await this.authCacheService.isAccessTokenExist(
        payload.userId,
        token,
      );
      if (!findTokenInRedis) {
        throw new UnauthorizedException();
      }
    } else if (tokenType === TokenType.REFRESH) {
      const isExist = await this.refreshRepository.isTokenExist(token);
      if (!isExist) {
        throw new UnauthorizedException();
      }
    }

    const user = await this.userRepository.findOneBy({
      id: payload.userId,
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    request.user = {
      userId: user.id,
      email: user.email,
    };
    return true;
  }
}

import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  // 검증로직
  // 검증끝나고 수행할 부분

  // constructor - 생성자
  //토큰, ... 체크를 다했다
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    const accessToken = req.headers.authorization.split(' ')[1];
    const tokenCheck = await this.cacheManager.get(
      `accessToken: ${accessToken}`,
    );

    if (tokenCheck) {
      throw new UnauthorizedException('이미 로그아웃이 되어 있습니다.');
    }

    return {
      id: payload.sub,
      email: payload.email,
      exp: payload.exp,
    };
  }
}

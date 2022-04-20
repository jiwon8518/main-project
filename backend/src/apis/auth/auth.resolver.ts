import {
  CACHE_MANAGER,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth-guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService, //모듈에 추가해야 사용가능
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, // 입력된 비밀번호
    @Args('password') password: string, // 입력된 비밀번호
    @Context() context: any, // req, res 정보를 가지고 있음
  ) {
    // 로그인
    // 1. 이메일과 비밀번호가 맞는 유저 찾기
    const user = await this.userService.findOne({
      email,
    });

    console.log(`😊user  :  ${user}`);
    console.log(`😊아이디  :  ${email}`);

    if (!user) {
      throw new UnprocessableEntityException('이메일이 없습니다');
    }
    const isAuthenticated = await bcrypt.compare(password, user.password); //compare 비교 하겠다, user.password -> 해시된 비밀번호
    if (!isAuthenticated) {
      // console.log(`password: ${password},
      // user.password: ${user.password}`);
      throw new UnauthorizedException('비밀번호가 틀렸습니다');
    }

    console.log('😁req:  ', context.req);
    console.log('😁res:  ', context.res);

    // 2. refreshToken(JWT)을 만들어서 프론트엔드 (쿠키)에 보내주기
    this.authService.setRefreshToken({ user, res: context.res });

    // 3.  acessToken(JWT)을 만들어서 프론트엔드에 보내주기
    return this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    return this.authService.getAccessToken({ user: currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async logout(
    @Context() context: any, // req, res 정보를 가지고 있음
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    const accessToken = context.req.headers.authorization.split(' ')[1];
    const refreshToken = context.req.headers.cookie.split('=')[1];
    // console.log('================================');
    // console.log('😁req:  ', context.req);
    // console.log('😁😁😁😁😁 accessToken:  ', accessToken);
    // console.log('😁😁😁😁😁 refreshToken:  ', refreshToken);
    // console.log('================================');
    let accessJwt;
    let refreshJwt;

    try {
      accessJwt = jwt.verify(accessToken, 'myAccessKey');
      refreshJwt = jwt.verify(refreshToken, 'myRefreshKey');
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    const time = Math.floor(Date.now() / 1000);

    await this.cacheManager.set(`accessToken:${accessToken}`, accessToken, {
      ttl: accessJwt.exp - time,
    });

    await this.cacheManager.set(`refreshToken:${refreshToken}`, refreshToken, {
      ttl: refreshJwt.exp - time,
    });

    return '로그아웃에 성공했습니다';
  }
}

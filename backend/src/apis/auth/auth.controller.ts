import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Request, Response } from 'express'; //?
// import dotenv from 'dotenv';
// dotenv.config();

interface IOAuthUser {
  user: Pick<User, 'name' | 'nickName' | 'email' | 'phoneNumber' | 'password'>;
}

@Controller('/')
export class AuthController {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService,
  ) {}

  // 구글
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 1. 가입확인
    // let user = await this.userService.findOne({ userId: req.user.id });
    let user = await this.userService.findOne({ email: req.user.email });
    console.log('===============google user=============');
    console.log(user);
    console.log('😁에러 req.user.id ' + req.user.email);
    console.log('😁에러 user: ' + user);

    // 2. 회원가입
    if (!user) {
      // const { password, ...rest } = req.user;
      // const createUser = { ...rest, hashedPassword: password };
      const createUser = req.user;

      user = await this.userService.create({ ...createUser });
    }

    // console.log(res);
    // 3. 로그인
    // 3-1. refreshToken 만들어서 넣어주기
    this.authService.setRefreshToken({ user, res });

    // 3-2. 프론트엔드 로그인 된 페이지로 리다이렉트 시켜주기(쿠키를 집어넣어서)
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }

  // 네이버
  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 1. 가입확인
    // let user = await this.userService.findOne({ userId: req.user.id });
    console.log('================naver= req================1;');
    console.log(req);
    let user = await this.userService.findOne({ email: req.user.email });
    console.log('================naver user================1;');
    console.log(user);
    console.log('😁에러 req.user.email ' + req.user.email);
    console.log('😁에러 user: ' + user);

    // 2. 회원가입
    if (!user) {
      console.log('================naver==req.user===============1;');
      console.log(req.user);
      const createUser = req.user;

      user = await this.userService.create({ ...createUser });
    }
    console.log('================naver=================1;');
    console.log(res);
    // 3. 로그인
    // 3-1. refreshToken 만들어서 넣어주기
    this.authService.setRefreshToken({ user, res });

    // 3-2. 프론트엔드 로그인 된 페이지로 리다이렉트 시켜주기(쿠키를 집어넣어서)
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }

  // 카카오
  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 1. 가입확인
    // let user = await this.userService.findOne({ userId: req.user.id });
    let user = await this.userService.findOne({ email: req.user.email });
    console.log('================kakao=user================1;');
    console.log('😁에러 req.user.id ' + req.user.email);
    console.log('😁user: ' + user);

    // 2. 회원가입
    if (!user) {
      console.log('================kakao==req.user===============1;');
      const createUser = req.user;

      user = await this.userService.create({ ...createUser });
    }
    console.log('================kakao=res================1;');
    console.log(res);
    // 3. 로그인
    // 3-1. refreshToken 만들어서 넣어주기
    this.authService.setRefreshToken({ user, res });

    // 3-2. 프론트엔드 로그인 된 페이지로 리다이렉트 시켜주기(쿠키를 집어넣어서)
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }
}

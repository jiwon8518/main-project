import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtRefreshStrategy } from 'src/common/auth/jwt-refresh.stategy';
import { JwtGoogleStrategy } from 'src/common/auth/jwt-social-google.stategy';
import { AuthController } from './auth.controller';
import { JwtNaverStrategy } from 'src/common/auth/jwt-social-naver.stategy';
import { JwtKakaoStrategy } from 'src/common/auth/jwt-social-kakako.stategy';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    JwtRefreshStrategy,
    JwtGoogleStrategy, //구글
    JwtNaverStrategy, // 네이버
    JwtKakaoStrategy, // 카카오
    AuthResolver, //
    AuthService,
    UserService,
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}

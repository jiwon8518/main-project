import { Strategy, Profile } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENTID, // REST API 키
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
      scope: ['profile_nickname', 'account_email'], // 카카오에서는 선택한것만 가져와야함
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(`accessToken: ${accessToken}`);
    console.log(`refreshToken: ${refreshToken}`);
    console.log(`profile: ${profile}`);

    console.log('===================카카오 프로필=======================');
    console.log('카카오 프로필: ', profile);
    return {
      email: profile._json.kakao_account.email,
      name: profile.displayName,
      nickName: profile.displayName,
      password: profile.id,
      phoneNumber: '01000000000',
    };
  }
}

// import { Strategy, Profile } from 'passport-naver';
import { Strategy, Profile } from 'passport-naver-v2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENTID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(`accessToken: ${accessToken}`);
    console.log(`refreshToken: ${refreshToken}`);
    console.log(`profile: ${profile}`);

    console.log('😁profile' + this.userProfile);
    console.log('===================네이버 프로필=======================');
    console.log('네이버 프로필: ', profile);
    return {
      // passport-naver-v2
      email: profile.email,
      name: profile.name,
      // name: profile.name === undefined ? 'default' : profile.name,
      nickName: profile.nickname,
      password: profile.id,
      phoneNumber: '01000000000',
    };
    // // passport-naver
    // return {
    //   email: profile.emails[0].value,
    //   name: profile.displayName,
    //   // name: profile.name === undefined ? 'default' : profile.name,
    //   nickName: profile.displayName,
    //   password: profile.id,
    //   phoneNumber: '01000000000',
    // };
  }
}

import {
  ConflictException,
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IamportService {
  async getToken() {
    try {
      const result = await axios.post('https://api.iamport.kr/users/getToken', {
        imp_key: process.env.IAMPORT_API_KEY,
        imp_secret: process.env.IAMPORT_SECRET,
      });
      return result.data.response.access_token;
      //   console.log('====================result.data.response.access_token=================================');
      //   console.log(result.data.response.access_token);
    } catch (error) {
      throw new HttpException( // 프론트쪽으로 에러메세지 전달
        error.response.data.message,
        error.response.status,
      );
      // console.log(error);
    }
  }

  async checkPaid({ impUid, amount, token }) {
    try {
      const result = await axios.get(
        `https://api.iamport.kr/payments/${impUid}`,
        {
          headers: { Authorization: token },
        },
      );

      console.log('=========result.data.response.amount=========');
      console.log(result.data.response.status);
      console.log(result.data.response.amount);
      console.log('=============================================');

      if (result.data.response.status !== 'paid') {
        throw new ConflictException('결제 내역이 존재하지 않습니다');
      }
      if (result.data.response.amount !== amount) {
        throw new UnprocessableEntityException('결제 금액이 잘못되었습니다');
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new HttpException(
          error.response.data.message,
          error.response.status,
        );
      } else {
        throw error;
      }
    }
  }

  async cancel({ impUid, token }) {
    try {
      const result = await axios.post(
        `https://api.iamport.kr/payments/cancel`,
        {
          imp_uid: impUid,
        },
        {
          headers: { Authorization: token },
        },
      );
      return result.data.response.cancel_amount;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }
}

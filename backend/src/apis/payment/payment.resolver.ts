import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import axios from 'axios';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth-guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { IamportService } from '../iamport/iamport.service';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Resolver()
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService, //
    private readonly iamportService: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard) // 로그인한 사람만 가능
  @Mutation(() => Payment)
  async createPayment(
    @Args('impUid') impUid: string, //
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // 검증하는 로직들!!
    // 1. 아임포트에 요청해서 결제 완료 기록이 존재하는지 확인한다
    const token = await this.iamportService.getToken();
    await this.iamportService.checkPaid({ impUid, amount, token });

    // 2. payment 테이블에는 impUid 가 1번만 존재해야 합니다(중복 결제를 체크)
    await this.paymentService.checkDuplicate({ impUid });

    return await this.paymentService.create({
      impUid,
      amount,
      currentUser,
      //status:PAYMENT_STATUS_ENUM.PAYMENT
    });
  }

  @UseGuards(GqlAuthAccessGuard) // 로그인한 사람만 가능
  @Mutation(() => Payment)
  async cancelPayment(
    @Args('impUid') impUid: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // 검증로직들!!
    // 1. 이미 취소된 건인지 확인
    await this.paymentService.checkAlreadyCanceled({ impUid });

    // 2. 실제로 아임포트에 취소 요청하기
    const token = await this.iamportService.getToken();
    const canceledAmount = await this.iamportService.cancel({ impUid, token });

    // 3. payment 테이블에 결제 취소 등록하기
    return await this.paymentService.cancel({
      impUid,
      amount: canceledAmount,
      currentUser,
    });
  }
}

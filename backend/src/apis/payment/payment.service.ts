import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>, //

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly connection: Connection,
  ) {}

  async findOne({ impUid }) {
    return await this.paymentRepository.findOne({ impUid });
  }

  async findAll() {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      // 조회시 락을 걸고 조회함으로써, 다른 퀴리에서 조회 못하게 막음(대기시킴) => Select ~ For Update
      const payment = await queryRunner.manager.find(Payment, {
        // 조건, 검색하는데 나 말고 아무도 못하게하면서.
        lock: { mode: 'pessimistic_write' },
      });
      console.log(payment);

      // 처리에 5초간의 시간이 걸림을 가정!!
      setTimeout(async () => {
        await queryRunner.commitTransaction();
      }, 5000);
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }

  // 중복확인
  async checkDuplicate({ impUid }) {
    const result = await this.paymentRepository.findOne({ impUid });
    if (result) {
      throw new ConflictException('이미 결제된 아이디 입니다.');
    }
  }

  // 취소된건인지 확인
  async checkAlreadyCanceled({ impUid }) {
    const payment = await this.paymentRepository.findOne({
      impUid, //
      status: PAYMENT_STATUS_ENUM.CANCEL,
    });
    if (payment) {
      // 충돌난거라서 ConflictException 사용
      throw new ConflictException('이미 취소된 결제 아이디 입니다');
    }
  }

  async cancel({ impUid, amount, currentUser }) {
    const payment = await this.create({
      impUid, //
      amount: -amount,
      currentUser,
      status: PAYMENT_STATUS_ENUM.CANCEL,
    });
    return payment;
  }

  async create({
    impUid,
    amount,
    currentUser,
    status = PAYMENT_STATUS_ENUM.PAYMENT,
  }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect(); // 데이터베이스 연결
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      // 1. 테이블에 결제기록 데이터 insert
      const payment = await this.paymentRepository.create({
        impUid: impUid,
        amount: amount,
        user: currentUser,
        status,
      });

      // await this.paymentRepository.save(payment);
      await queryRunner.manager.save(payment);
      // throw new Error(); // 에러확인

      // 2. 유저 정보를 조회 해서
      // const user = await this.userRepository.findOne({ id: currentUser.id });
      const user = await queryRunner.manager.findOne(
        User, //
        { id: currentUser.id },
        { lock: { mode: 'pessimistic_write' } },
      );
      console.log('==================user=========================');
      console.log(user);
      console.log('============================================');

      // 3. 유저의 결제금액 업데이트(총결제금액?!)
      const updatedUser = await this.userRepository.create({
        ...user, // 조건
        cumulativeAmount: user.cumulativeAmount + amount,
      });
      await queryRunner.manager.save(updatedUser);
      await queryRunner.commitTransaction();

      // 4. 최종결과 돌려주기
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release;
    }
  }
}

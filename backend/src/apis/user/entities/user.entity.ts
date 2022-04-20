//-- 사용자 --//
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coupon } from 'src/apis/coupon/entities/coupon.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  nickName: string;

  @Column()
  @Field(() => String)
  phoneNumber: string;

  @Column({ nullable: true })
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String) 비밀번호 노출금지
  password: string;

  @ManyToMany(() => Coupon, (coupons) => coupons.users)
  //@Field(() => [Coupon])
  coupons: Coupon[];

  @Column({ default: 0 })
  @Field(() => Int)
  cumulativeAmount: number; // 누적금액
}

import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  nickName: string;

  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  password: string;

  // @ManyToMany(() => Coupon, (coupons) => coupons.users)
  // //@Field(() => [Coupon])
  // coupons: Coupon[];
}

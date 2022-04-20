import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateRoomInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Int, { nullable: true })
  inventory: number;

  @Field(() => Int, { nullable: true })
  basicNumberPeople: number;

  @Field(() => Int, { nullable: true })
  maxNumberPeople: number;

  @Field(() => String, { nullable: true })
  usageTypeName: string;

  @Field(() => Date, { nullable: true })
  startTime: Date;

  @Field(() => Date, { nullable: true })
  endTime: Date;

  @Field(() => Int, { nullable: true })
  totalTimeAmount: number;

  @Field(() => Int, { nullable: true })
  price: number;

  @Field(() => Date, { nullable: true })
  checkInDate: Date;

  @Field(() => Date, { nullable: true })
  checkOutDate: Date;
}

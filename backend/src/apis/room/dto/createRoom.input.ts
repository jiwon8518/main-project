import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  inventory: number;

  @Field(() => Int)
  basicNumberPeople: number;

  @Field(() => Int)
  maxNumberPeople: number;

  @Field(() => String)
  usageTypeName: string;

  @Field(() => Date)
  startTime: Date;

  @Field(() => Date)
  endTime: Date;

  @Field(() => Int)
  totalTimeAmount: number;

  @Field(() => Int)
  price: number;

  @Field(() => Date)
  checkInDate: Date;

  @Field(() => Date)
  checkOutDate: Date;

  @Field(() => String)
  subCategoryId: string;

  @Field(() => [String])
  roomTags: string[];
}

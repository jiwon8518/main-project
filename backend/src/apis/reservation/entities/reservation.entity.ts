//-- 예약 --//
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/apis/user/entities/user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => Date)
  orderDate: Date;

  @Column()
  @Field(() => Date)
  checkInDate: Date;

  @Column()
  @Field(() => Date)
  checkOutDate: Date;

  @Column()
  @Field(() => String)
  status: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}

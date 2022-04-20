//-- 룸 --//
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SubCategory } from 'src/apis/subCategory/entities/subCategory.entity';
import { RoomTag } from 'src/apis/roomtTag/entities/roomTag.entity';

@Entity()
@ObjectType()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  inventory: number;

  @Column()
  @Field(() => Int)
  basicNumberPeople: number;

  @Column()
  @Field(() => Int)
  maxNumberPeople: number;

  @Column()
  @Field(() => String)
  usageTypeName: string;

  @Column()
  @Field(() => Date)
  startTime: Date;

  @Column()
  @Field(() => Date)
  endTime: Date;

  @Column()
  @Field(() => Int)
  totalTimeAmount: number;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => Date)
  checkInDate: Date;

  @Column()
  @Field(() => Date)
  checkOutDate: Date;

  // 소프트 삭제(TypeORM 제공)
  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => SubCategory, { cascade: true, onDelete: 'CASCADE' }) // 여러개 상품, 하나의 카테고리
  @Field(() => SubCategory)
  subCategory: SubCategory;

  // @ManyToOne(() => Place)
  // @Field(() => Place)
  // place: Place;

  @JoinTable()
  @ManyToMany(() => RoomTag, (roomTags) => roomTags.rooms)
  @Field(() => [RoomTag])
  roomTags: RoomTag[];
}

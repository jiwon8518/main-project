//-- 이미지 --//
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Place } from 'src/apis/place/entities/place.entity';
import { Room } from 'src/apis/room/entities/room.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  url: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isMain: boolean;

  // 소프트 삭제(TypeORM 제공)
  @DeleteDateColumn()
  deleteAt: Date;

  @JoinColumn() // 생략 가능
  @ManyToOne(() => Place)
  @Field(() => Place)
  place: Place;

  @ManyToOne(() => Room, (room) => room.id)
  // @Field(() => Room)

  // @ManyToOne(() => Room)
  // @Field(() => Room)
  room: Room;
}

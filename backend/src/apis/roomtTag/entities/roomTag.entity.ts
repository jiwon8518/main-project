import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Room } from 'src/apis/room/entities/room.entity';

@Entity()
@ObjectType()
export class RoomTag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => Room, (rooms) => rooms.roomTags)
  @Field(() => [Room])
  rooms: Room[];
}

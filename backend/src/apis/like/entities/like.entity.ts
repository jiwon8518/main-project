//-- 찜 --//
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Place } from 'src/apis/place/entities/place.entity';
import { User } from 'src/apis/user/entities/user.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Place)
  place: Place;

  @ManyToOne(() => User)
  user: User;
}

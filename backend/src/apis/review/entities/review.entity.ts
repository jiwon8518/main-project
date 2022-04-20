//-- 후기 --//
import { Place } from 'src/apis/place/entities/place.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  kindness: number;

  @Column()
  convenience: number;

  @Column()
  locationSatisfaction: number;

  @Column()
  clean: number;

  @Column()
  contents: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Place)
  place: Place;

  @ManyToOne(() => Review)
  review: Review;
}

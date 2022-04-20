//-- 쿠폰 --//
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/apis/user/entities/user.entity';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  contents: string;

  @Column()
  discountAmount: number;

  @Column()
  condition: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @JoinTable()
  @ManyToMany(() => User, (users) => users.coupons)
  users: User[];
}

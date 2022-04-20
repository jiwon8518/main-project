//-- 장바구니 --//
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from 'src/apis/reservation/entities/reservation.entity';
import { Room } from 'src/apis/room/entities/room.entity';

@Entity()
export class ShoppingBasket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Reservation)
  reservation: Reservation;

  @ManyToOne(() => Room)
  room: Room;
}

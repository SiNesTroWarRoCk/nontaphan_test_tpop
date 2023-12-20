import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { Event } from 'src/event/entity/event.entity';
import { Seat } from 'src/seat_management/entity/seat.entity';
@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.reservation)
  user: User;

  @ManyToOne(() => Event, event => event.reservation)
  event: Event;

  @ManyToOne(() => Seat, seat => seat.reservation)
  seat: Seat;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}

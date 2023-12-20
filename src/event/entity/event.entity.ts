import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Seat } from 'src/seat_management/entity/seat.entity';
import { Reservation } from 'src/reservation/entity/reservation.entity';
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event_name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: 2})
  status: number;
  
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToMany(type => Seat, seat => seat.event)
  seats: Seat[];

  @OneToMany(() => Reservation, reservation => reservation.event)
  reservation: Reservation[];

  

}

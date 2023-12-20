import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Event } from 'src/event/entity/event.entity';
import { Reservation } from 'src/reservation/entity/reservation.entity';
@Entity()
export class Seat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    zone: string; 

    @Column()
    row: number;

    @Column()
    seat_number: number;

    @Column({ default: 2 })
    is_available: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @ManyToOne(type => Event, event => event.seats)
    event: Event;

    @OneToMany(() => Reservation, reservation => reservation.seat)
    reservation: Reservation[];
}
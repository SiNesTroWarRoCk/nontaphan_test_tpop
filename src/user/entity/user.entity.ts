import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Reservation } from 'src/reservation/entity/reservation.entity';
@Entity()
export class User {  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(type => Reservation, reservation => reservation.user)
  reservation: Reservation[];

  
  
}
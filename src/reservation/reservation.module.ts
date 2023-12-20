import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from 'src/seat_management/entity/seat.entity';
import { Event } from 'src/event/entity/event.entity';
import { User } from 'src/user/entity/user.entity';
import { Reservation } from './entity/reservation.entity';
@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
  imports:[
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Event]),
    TypeOrmModule.forFeature([Seat]),
    TypeOrmModule.forFeature([Reservation]),
  ]
})
export class ReservationModule {}

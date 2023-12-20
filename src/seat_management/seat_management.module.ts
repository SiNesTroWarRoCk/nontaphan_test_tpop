import { Module } from '@nestjs/common';
import { SeatManagementController } from './seat_management.controller';
import { SeatManagementService } from './seat_management.service';
import { Seat } from './entity/seat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/event/entity/event.entity';
@Module({
  controllers: [SeatManagementController],
  providers: [SeatManagementService],
  imports: [
    TypeOrmModule.forFeature([Seat]),
    TypeOrmModule.forFeature([Event])
  ],

})
export class SeatManagementModule {}

import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event } from './entity/event.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [TypeOrmModule.forFeature([Event])],
})
export class EventModule {}

import { Injectable } from '@nestjs/common';
import { Event } from './entity/event.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from 'src/seat_management/entity/seat.entity';
@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
    ){}

    async getAllEvents(): Promise<any>{
        const events = await this.eventRepository
            .createQueryBuilder('event')
            .addSelect(subQuery => {
                return subQuery
                    .select('COUNT(seat.id)', 'seatCount')
                    .from(Seat, 'seat')
                    .where('seat.eventId = event.id'); 
            }, 'seatCount')
            .getRawMany();


        const results = [];

        for (const item of events) {
            results.push({
                item,
                total_seat: parseInt(item.seatCount, 10),
            });
        }

        return results;
    }
}

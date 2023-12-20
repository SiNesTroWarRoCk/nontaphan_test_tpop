import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './entity/seat.entity';
import { SeatDTO } from './dto/seat.dto';
import { Event } from 'src/event/entity/event.entity';
@Injectable()
export class SeatManagementService {

    constructor(
        @InjectRepository(Seat)
        private seatRepository: Repository<Seat>,
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
    ) { }

    async getSeatById(seatId: number): Promise<Seat> {
        const seat = await this.seatRepository.findOneBy({ id: seatId });

        if (!seat) {
            throw new NotFoundException(`Seat with ID ${seatId} not found`);
        }

        return seat;
    }

    async getAllSeats(): Promise<Seat[]> {

        return this.seatRepository
            .createQueryBuilder('seat')
            .leftJoinAndSelect('seat.event', 'event')
            .select([
                'seat.id',
                'seat.zone',
                'seat.row',
                'seat.seat_number',
                'seat.is_available',
                'seat.date',
                'event.id',
                'event.event_name',
            ])
            .getMany();

    }

    async addSeat(seatData: SeatDTO): Promise<Seat> {
        const event = await this.eventRepository.findOneBy({ id: seatData.event_id });

        const seat = this.seatRepository.create({
            zone: seatData.zone,
            row: seatData.row,
            seat_number: seatData.seat_number,
            is_available: seatData.is_available,
            event, 
        });

        await this.seatRepository.save(seat);

        return seat;
    }

    async updateSeat(seatId: number, updateData: any): Promise<Seat> {
        const seat = await this.seatRepository.findOneBy({ id: seatId });

        if (!seat) {
            throw new Error('Seat not found');
        }

        seat.zone = updateData.zone || seat.zone;
        seat.row = updateData.row || seat.row;
        seat.seat_number = updateData.seat_number || seat.seat_number;
        seat.is_available = updateData.is_available !== undefined ? updateData.is_available : seat.is_available;

        return this.seatRepository.save(seat);
    }

    async deleteSeat(seatId: number): Promise<void> {
        const seat = await this.seatRepository.findOneBy({ id: seatId });

        if (!seat) {
            throw new NotFoundException(`Seat with ID ${seatId} not found`);
        }

        await this.seatRepository.remove(seat);
    }

}

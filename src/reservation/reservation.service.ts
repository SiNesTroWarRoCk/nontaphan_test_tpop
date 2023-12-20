import { Injectable, NotFoundException } from '@nestjs/common';
import { Reservation } from './entity/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from 'src/event/entity/event.entity';
import { User } from 'src/user/entity/user.entity';
import { Seat } from 'src/seat_management/entity/seat.entity';
@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,

        @InjectRepository(Event)
        private eventRepository: Repository<Event>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Seat)
        private seatRepository: Repository<Seat>,
    ) { }

    async createReservation(userId: number, eventId: number, seatId: number): Promise<any> {
        const user = await this.userRepository.findOneBy({ id: userId });
    
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        delete user.password;

        const event = await this.eventRepository.findOneBy({ id: eventId });
        if (!event) {
            throw new NotFoundException(`Event not found`);
        }

        const seat = await this.seatRepository.findOneBy({ id: seatId ,is_available:2});

        
        if (!seat) {
            return `The seat is not available.`;
        }

        const reserve = this.reservationRepository.create({               
            user,
            event,
            seat,
        });

        const savedReservation = await this.reservationRepository.save(reserve);

        // Update the seat to mark it as reserved (is_available = 1)
        await this.seatRepository.update(seat.id, { is_available: 1 });

        return savedReservation;
    }

    async getMyReservation(userId:number):Promise<any>{  

        return this.reservationRepository
            .createQueryBuilder('reservation')
            .leftJoinAndSelect('reservation.event', 'event') 
            .leftJoinAndSelect('reservation.seat', 'seat') 
            .select([
                'reservation.id', 
                'reservation.date', 
                'event.event_name', 
                'event.description',
                'seat.zone',
                'seat.row',
                'seat.seat_number',
            ])            
            .where('reservation.userId = :userId', { userId: userId }) // Filter by userId
            .getMany();

    }
}


import { IsNotEmpty, IsNumber } from 'class-validator';
export class ReservationDTO {
    @IsNotEmpty()
    @IsNumber()
    event_id: number;

    @IsNotEmpty()
    @IsNumber()
    seat_id: number;

}

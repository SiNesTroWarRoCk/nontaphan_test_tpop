
import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
export class SeatDTO {
    @IsNotEmpty()
    @IsString()
    zone: string;

    @IsNotEmpty()
    @IsNumber()
    row: number;

    @IsNotEmpty()
    @IsNumber()
    seat_number: number;

    @IsNotEmpty()
    @IsNumber()
    is_available: number;

    @IsNumber()
    @IsNotEmpty()
    event_id: number;


}

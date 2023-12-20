import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReservationService } from './reservation.service';
import { ReservationDTO } from './dto/reservation.dto';
@Controller('reservation')
export class ReservationController {
    constructor(
        private readonly reservationService: ReservationService,
    ) { }
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createReservation(@Body() reservationDTO: ReservationDTO, @Req() req: any): Promise<object> {
        try {
            const userId = req.user.id;
            console.log(userId);
            
            const { event_id, seat_id } = reservationDTO;
            
            const reservation = await this.reservationService.createReservation(userId, event_id, seat_id);   
    
            return { success: true, response : reservation };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('my-reservation')
    async myReservation(@Req() req: any): Promise<object> {
        try {
            const userId = req.user.id;                        
            const reservation = await this.reservationService.getMyReservation(userId);   
    
            return { success: true, response: reservation };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

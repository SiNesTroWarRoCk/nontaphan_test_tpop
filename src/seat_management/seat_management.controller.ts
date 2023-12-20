import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Seat } from './entity/seat.entity';
import { SeatDTO } from './dto/seat.dto';
import { SeatManagementService } from './seat_management.service';

@Controller('seat-management')
export class SeatManagementController {
    constructor(private seatManagementService: SeatManagementService) { }

    @Get(':id')
    async getSeatById(@Param('id') seatId: number): Promise<any> {
        try {
            const seat = await this.seatManagementService.getSeatById(seatId);
            return { success: true, seat };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    @Get()
    async getAllSeats(): Promise<any> {
        try {
            const seats = await this.seatManagementService.getAllSeats();
            return { success: true, seats };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    @Post()
    async addSeat(@Body() seatDTO: SeatDTO): Promise<any> {
        try {
            const createdSeat = await this.seatManagementService.addSeat(seatDTO);
            return { success: true, seat: createdSeat };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    @Put(':id')
    async updateSeat(@Param('id') seatId: number, @Body() updateData: any): Promise<any> {
        try {
            const updatedSeat = await this.seatManagementService.updateSeat(seatId, updateData);
            return { success: true, seat: updatedSeat };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    @Delete(':id')
    async deleteSeat(@Param('id') seatId: number): Promise<any> {
        try {
            await this.seatManagementService.deleteSeat(seatId);
            return { success: true, message: 'Seat deleted successfully' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

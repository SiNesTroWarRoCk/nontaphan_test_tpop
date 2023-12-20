import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { EventService } from './event.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('event')
export class EventController {
    constructor(private readonly eventService :EventService){}
    
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @Get()
    async getEvents() {
        try {
            return { success: true, data: await this.eventService.getAllEvents() };
        } catch (error) {
            return { success: false, error: error.message };
        }    
    }
}

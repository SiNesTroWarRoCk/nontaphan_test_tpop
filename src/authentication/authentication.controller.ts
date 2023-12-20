import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import {AuthenticationService} from './authentication.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('authentication')
export class AuthenticationController {    
    constructor(private readonly authenticationService:AuthenticationService){}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req: any) {
        try {
            const token = await this.authenticationService.login(req.user);          
            return { success: true, access_token: token };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

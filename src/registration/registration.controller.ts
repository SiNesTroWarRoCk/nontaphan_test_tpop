import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { RegistrationService } from './registration.service';
import { User } from '../user/entity/user.entity';
@Controller('registration')
export class RegistrationController {
    constructor(private readonly registerService: RegistrationService) { }

    @Post('/')
    async register(@Body() registerDTO: RegisterDTO): Promise<object> {             
        try {
            const register = await this.registerService.registerUser(registerDTO);
            return { success: true, msg: register };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

}

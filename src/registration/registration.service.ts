import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class RegistrationService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private userService: UserService,
    ) { }

    async registerUser(registerDTO: RegisterDTO): Promise<string> {
        const userExists = await this.userService.findByEmail(registerDTO.email);
        if (userExists) {
            throw new ConflictException('Email already exists');
        }

        const { email, password } = registerDTO;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({
            email,
            password: hashedPassword,
        });

        await this.userRepository.save(user);
        
        let response : string;
        if (user){
            response = `register successful.`
        }   
        return response;
    }
}

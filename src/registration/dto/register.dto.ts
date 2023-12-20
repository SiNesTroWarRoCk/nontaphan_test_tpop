import { MatchPasswordConstraint } from './../validators/match-password.validator';
import { IsString, IsNotEmpty, MinLength, MaxLength, Matches, Equals, IsEmail } from 'class-validator';
import { IsStrongPassword } from '../validators/strong-password.validator';
import { MatchPassword } from '../validators/match-password.validator';

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(32, { message: 'Password must not exceed 32 characters.' })
  @IsStrongPassword()
  password: string;
  
  @IsNotEmpty()
  @MatchPassword('password')
  confirmPassword: string;

}

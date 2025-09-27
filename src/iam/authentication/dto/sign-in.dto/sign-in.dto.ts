import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @ApiProperty({ format: 'email' })
  email: string;

  @MinLength(10)
  @ApiProperty({ minLength: 10 })
  password: string;
}

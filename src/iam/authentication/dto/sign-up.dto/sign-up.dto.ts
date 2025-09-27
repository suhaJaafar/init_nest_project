import { UserRole } from '@app/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsEnum, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @ApiProperty({ format: 'email' })
  email: string;

  @MinLength(10)
  @ApiProperty({ minLength: 10 })
  password: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  name: string;

  @IsEnum(UserRole, { each: true })
  @ApiProperty({ enum: UserRole, isArray: true, example: ['ADMIN'] })
  roles: UserRole[];
}

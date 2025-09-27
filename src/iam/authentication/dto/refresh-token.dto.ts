import { IsJWT, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  // It's optional because it might come in the cookies
  @IsOptional()
  @IsJWT()
  @ApiProperty()
  refreshToken: string;
}

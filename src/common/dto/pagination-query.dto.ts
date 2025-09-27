import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SortOrder } from '@app/enums';
import { Transform } from 'class-transformer';
import { parseStringInt } from '@app/utils';

export class PaginationQueryDto {
  @Transform(parseStringInt)
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @ApiProperty({
    description: 'Page size',
    default: 10,
    required: false,
    type: 'integer',
  })
  limit?: number;

  @Transform(parseStringInt)
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description:
      'Page offset. For 10 per page setup, offset 0 is the first page, offset 10 is the second page, etc.',
    default: 0,
    required: false,
    type: 'integer',
  })
  offset?: number;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiProperty({
    description: 'Sort order',
    enum: SortOrder,
    enumName: 'SortOrderEnum',
    required: false,
  })
  order?: SortOrder;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The field to sort by',
  })
  orderBy?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Search query',
    required: false,
  })
  query?: string;
}

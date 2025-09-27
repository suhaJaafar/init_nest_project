import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsIn, IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "@app/dto/pagination-query.dto";
import { findManyDto } from "@app/dto/find-many.dto";
import { KulImage } from "@app/entities/kul-image.entity";
import { ImageOwnerType } from "@app/enums";

const OrderProps: Array<keyof KulImage> = ["id", "alt", "publicId", "url", "createdAt", "updatedAt"];

export class FindImagesQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  @IsIn(OrderProps)
  @ApiProperty({ required: false, enum: OrderProps })
  orderBy?: keyof KulImage;

  @IsOptional()
  @IsEnum(ImageOwnerType)
  @ApiProperty({ required: false, enum: ImageOwnerType })
  ownerType?: ImageOwnerType;
}

export class FindManyImagesDto extends findManyDto<KulImage>(KulImage) {}

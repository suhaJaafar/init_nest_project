import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateImageDto } from "@app/dto/create-image.dto";

export class UpdateImageDto extends PartialType(OmitType(CreateImageDto, ["file", "ownerType"])) {}

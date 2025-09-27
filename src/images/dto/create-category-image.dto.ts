import { OmitType } from "@nestjs/swagger";
import { CreateImageDto } from "@app/dto/create-image.dto";

export class CreateCategoryImageDto extends OmitType(CreateImageDto, ["ownerType"]) {}

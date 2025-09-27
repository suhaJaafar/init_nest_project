import { PickType } from "@nestjs/swagger";
import { KulImage } from "@app/entities/kul-image.entity";
import { FindOptionsSelect } from "typeorm";

export class ImageDto extends PickType(KulImage, ["id", "url", "alt"]) {
  static get Select(): FindOptionsSelect<ImageDto> {
    return {
      id: true,
      url: true,
      alt: true,
    };
  }

  static fromEntity(entity: KulImage): ImageDto {
    return {
      id: entity.id,
      url: entity.url,
      alt: entity.alt,
    };
  }
}

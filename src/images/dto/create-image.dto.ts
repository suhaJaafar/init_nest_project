import { ApiProperty, PickType } from "@nestjs/swagger";
import { Express } from "express";
import { KulImage } from "@app/entities/kul-image.entity";

export class CreateImageDto extends PickType(KulImage, ["alt", "keywords", "ownerType"]) {
  @ApiProperty({
    type: "string",
    format: "binary",
    description: "File to upload",
  })
  file: Express.Multer.File;
}

export class CreateImagesDto extends PickType(KulImage, ["alt", "keywords", "ownerType"]) {
  @ApiProperty({
    type: "array",
    items: { type: "string", format: "binary" },
    required: true,
    description: "Files to upload",
  })
  files: Express.Multer.File[];
}

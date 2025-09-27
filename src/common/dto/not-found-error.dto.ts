import { ApiProperty } from "@nestjs/swagger";

export class NotFoundErrorDto implements GenericError {
  @ApiProperty({ default: "Not Found" })
  message: string;

  @ApiProperty({
    description: "The error details",
    nullable: true,
  })
  error?: string;

  @ApiProperty({ default: 404, type: "integer" })
  statusCode: number;
}

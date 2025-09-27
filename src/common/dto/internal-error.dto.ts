import { ApiProperty } from "@nestjs/swagger";

export class InternalErrorDto implements GenericError {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: "The error details",
    nullable: true,
  })
  error?: string;

  @ApiProperty({ default: 500, type: "integer" })
  statusCode: number;
}

import { ApiProperty } from "@nestjs/swagger";

export class ConflictErrorDto implements GenericError {
  @ApiProperty({ default: "Conflict" })
  message: string;

  @ApiProperty({
    description: "The error details",
    nullable: true,
  })
  error?: string;

  @ApiProperty({ default: 409, type: "integer" })
  statusCode: number;
}

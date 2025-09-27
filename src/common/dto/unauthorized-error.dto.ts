import { ApiProperty } from "@nestjs/swagger";

export class UnauthorizedErrorDto implements GenericError {
  @ApiProperty({ default: "Unauthorized" })
  message: string;

  @ApiProperty({
    description: "The error details",
    nullable: true,
  })
  error?: string;

  @ApiProperty({ default: 401, type: "integer" })
  statusCode: number;
}

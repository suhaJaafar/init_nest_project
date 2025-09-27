import { ApiProperty } from "@nestjs/swagger";
import { Type } from "@nestjs/common";

export function findManyDto<T>(classRef: Type<T>) {
  class FindManyDto implements FindManyResponse<T> {
    @ApiProperty({ type: "integer" })
    total: number;

    @ApiProperty({ nullable: true, required: false, type: "integer" })
    limit?: number;

    @ApiProperty({ type: "integer" })
    offset: number;

    @ApiProperty({ type: [classRef] })
    data: T[];
  }

  return FindManyDto;
}

import { ArgumentMetadata, BadRequestException, Injectable, Optional, PipeTransform } from "@nestjs/common";
import { getPropertyPlace, parseStringDate } from "@app/utils";
import { ParseEnumPipeOptions } from "@nestjs/common/pipes/parse-enum.pipe";
import { GenericValidationError } from "@app/dto/validation-error.dto";
import { ValidationConstraint } from "@app/enums";

type Options = Pick<ParseEnumPipeOptions, "optional">;

@Injectable()
export class ParseDateGenericPipe implements PipeTransform<string, Date | undefined> {
  constructor(@Optional() private options?: Options) {}

  transform(value: string, metadata: ArgumentMetadata): Date | undefined {
    const parsedDate = parseStringDate({ value });

    // Successfully parsed
    if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) return parsedDate;

    // Optional and not provided
    if (!value && this.options?.optional) return undefined;

    // Required and invalid
    throw new BadRequestException(
      GenericValidationError.errorFrom({
        property: metadata.data as string,
        message: "Invalid date format",
        propertyPlace: getPropertyPlace(metadata.type),
        constraint: ValidationConstraint.IsDate,
      }),
    );
  }
}

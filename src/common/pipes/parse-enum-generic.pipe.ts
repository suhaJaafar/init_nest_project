import { ArgumentMetadata, ParseEnumPipe } from "@nestjs/common";
import { getPropertyPlace } from "@app/utils";
import { ValidationConstraint } from "@app/enums";
import { GenericValidationError } from "@app/dto/validation-error.dto";

export class ParseEnumGenericPipe extends ParseEnumPipe {
  transform(value: string, metadata: ArgumentMetadata): Promise<typeof this.enumType> {
    this.exceptionFactory = (message) =>
      GenericValidationError.errorFrom({
        property: metadata.data as string,
        message,
        constraint: ValidationConstraint.IsEnum,
        propertyPlace: getPropertyPlace(metadata.type),
      });
    return super.transform(value, metadata);
  }
}

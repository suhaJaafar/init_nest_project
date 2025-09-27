import { ArgumentMetadata, ParseIntPipe } from "@nestjs/common";
import { getPropertyPlace } from "@app/utils";
import { ValidationConstraint } from "@app/enums";
import { GenericValidationError } from "@app/dto/validation-error.dto";

export class ParseIntGenericPipe extends ParseIntPipe {
  transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    this.exceptionFactory = (message) =>
      GenericValidationError.errorFrom({
        property: metadata.data as string,
        message,
        constraint: ValidationConstraint.IsInt,
        propertyPlace: getPropertyPlace(metadata.type),
      });

    return super.transform(value, metadata);
  }
}

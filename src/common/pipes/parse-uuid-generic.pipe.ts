import { ArgumentMetadata, ParseUUIDPipe } from "@nestjs/common";
import { getPropertyPlace } from "@app/utils";
import { ValidationConstraint } from "@app/enums";
import { GenericValidationError } from "@app/dto/validation-error.dto";

export class ParseUUIDGenericPipe extends ParseUUIDPipe {
  transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    this.exceptionFactory = (message) =>
      GenericValidationError.errorFrom({
        property: metadata.data as string,
        message,
        constraint: ValidationConstraint.IsUUID,
        propertyPlace: getPropertyPlace(metadata.type),
      });
    return super.transform(value, metadata);
  }
}

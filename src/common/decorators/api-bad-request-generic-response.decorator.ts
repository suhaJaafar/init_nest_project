import { ApiBadRequestResponse } from "@nestjs/swagger";
import { ValidationErrorDto } from "@app/dto/validation-error.dto";

interface Options {
  description?: string;
}

export function ApiBadRequestGenericResponse({ description }: Options = {}): MethodDecorator & ClassDecorator {
  return (target: object, key?: string | symbol, descriptor: TypedPropertyDescriptor<any> = {}) => {
    if (key) {
      // Method
      ApiBadRequestResponse({
        type: ValidationErrorDto,
        description: description ?? "Bad request",
      })(target, key, descriptor);
    } else {
      // Class
      ApiBadRequestResponse({
        type: ValidationErrorDto,
        description: description ?? "Bad request",
      })(target as any);
    }
  };
}

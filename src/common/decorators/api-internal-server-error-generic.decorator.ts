import { ApiResponse } from "@nestjs/swagger";
import { InternalErrorDto } from "@app/dto/internal-error.dto";

interface Options {
  description?: string;
}

export function ApiInternalServerErrorGenericResponse({ description }: Options = {}): MethodDecorator &
  ClassDecorator {
  return (target: object, key?: string | symbol, descriptor: TypedPropertyDescriptor<any> = {}) => {
    if (key) {
      // Method
      ApiResponse({
        type: InternalErrorDto,
        description: description ?? "Internal server error",
      })(target, key, descriptor);
    } else {
      // Class
      ApiResponse({
        type: InternalErrorDto,
        description: description ?? "Internal server error",
      })(target as any);
    }
  };
}

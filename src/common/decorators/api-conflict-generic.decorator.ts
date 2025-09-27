import { ApiConflictResponse } from "@nestjs/swagger";
import { ConflictErrorDto } from "@app/dto/conflict-error.dto";

interface Options {
  description?: string;
}

export function ApiConflictGenericResponse({ description }: Options = {}): MethodDecorator & ClassDecorator {
  return (target: object, key?: string | symbol, descriptor: TypedPropertyDescriptor<any> = {}) => {
    if (key) {
      // Method
      ApiConflictResponse({
        type: ConflictErrorDto,
        description: description ?? "Conflict",
      })(target, key, descriptor);
    } else {
      // Class
      ApiConflictResponse({
        type: ConflictErrorDto,
        description: description ?? "Conflict",
      })(target as any);
    }
  };
}

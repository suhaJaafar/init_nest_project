import { ApiUnauthorizedResponse } from "@nestjs/swagger";
import { UnauthorizedErrorDto } from "@app/dto/unauthorized-error.dto";

interface Options {
  description?: string;
}

export function ApiUnauthorizedGenericResponse({ description }: Options = {}): MethodDecorator & ClassDecorator {
  return (target: object, key?: string | symbol, descriptor: TypedPropertyDescriptor<any> = {}) => {
    if (key) {
      // Method
      ApiUnauthorizedResponse({
        type: UnauthorizedErrorDto,
        description: description ?? "Unauthorized",
      })(target, key, descriptor);
    } else {
      // Class
      ApiUnauthorizedResponse({
        type: UnauthorizedErrorDto,
        description: description ?? "Unauthorized",
      })(target as any);
    }
  };
}

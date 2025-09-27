import { ApiNotFoundResponse } from "@nestjs/swagger";
import { NotFoundErrorDto } from "@app/dto/not-found-error.dto";

interface Options {
  description?: string;
}

export const ApiNotFoundGenericResponse =
  ({ description }: Options = {}): MethodDecorator =>
  (target, propertyKey, descriptor) => {
    ApiNotFoundResponse({
      description: description ?? "Resource not found",
      type: NotFoundErrorDto,
    })(target, propertyKey, descriptor);
  };

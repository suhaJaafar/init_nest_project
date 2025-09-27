import { ApiNoContentResponse } from "@nestjs/swagger";

interface Options {
  description?: string;
}

export const ApiNoContentGenericResponse =
  ({ description }: Options = {}): MethodDecorator =>
  (target, propertyKey, descriptor) => {
    ApiNoContentResponse({
      description: description ?? "Success with no content",
    })(target, propertyKey, descriptor);
  };

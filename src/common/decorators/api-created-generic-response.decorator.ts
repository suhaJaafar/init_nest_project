import { ApiCreatedResponse } from "@nestjs/swagger";

interface Options {
  type: any;
  description?: string;
}

export const ApiCreatedGenericResponse =
  ({ type, description }: Options): MethodDecorator =>
  (target, propertyKey, descriptor) => {
    ApiCreatedResponse({
      type,
      description: description ?? "Resource created successfully",
    })(target, propertyKey, descriptor);
  };

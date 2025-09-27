import { ApiHeader } from "@nestjs/swagger";

export const ApiJsonContentHeader = (): MethodDecorator => (target, propertyKey, descriptor) => {
  ApiHeader({
    name: "content-type",
    required: false,
    description: "Use `application/json` if you're sending data in the request body",
  })(target, propertyKey, descriptor);
};

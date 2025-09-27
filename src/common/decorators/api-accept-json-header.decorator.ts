import { ApiHeader } from "@nestjs/swagger";

export const ApiAcceptJSONHeader = (): MethodDecorator => (target, propertyKey, descriptor) => {
  ApiHeader({
    name: "accept",
    description: "Use `application/json` if you're expecting the response in the body",
    required: false,
  })(target, propertyKey, descriptor);
};

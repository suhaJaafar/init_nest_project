import { ApiHeader } from "@nestjs/swagger";

interface Options {
  required?: boolean;
}

export const ApiAcceptLanguageHeader =
  ({ required = false }: Options = {}): MethodDecorator =>
  (target, propertyKey, descriptor) => {
    ApiHeader({
      name: "accept-language",
      description: "Language code (Default is Arabic)",
      // enum: SupportedLanguages,
      required,
    })(target, propertyKey, descriptor);
  };

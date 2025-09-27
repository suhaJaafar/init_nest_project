import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export const IS_GREATER_THAN = "isGreaterThan";

export function IsGreaterThan(
  property: string,
  validationOptions?: ValidationOptions & {
    skipIfValueIs?: any;
  },
) {
  return function (obj: object, propertyName: string) {
    registerDecorator({
      name: IS_GREATER_THAN,
      target: obj.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          const skipValue = validationOptions?.skipIfValueIs;
          const comparableTypes = ["number", "string"];
          if (comparableTypes.includes(typeof value) && comparableTypes.includes(typeof relatedValue)) {
            return value > relatedValue || (skipValue !== undefined && skipValue === value);
          }
          return false;
        },
      },
    });
  };
}

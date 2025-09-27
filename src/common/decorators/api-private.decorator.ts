import { ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';

/**
 * Marks a controller or endpoint as private.
 * Meaning that it requires authentication.
 */
export function ApiPrivate(): MethodDecorator & ClassDecorator {
  return (
    target: object,
    key?: string | symbol,
    descriptor: TypedPropertyDescriptor<any> = {},
  ) => {
    if (key) {
      // Method
      ApiBearerAuth()(target, key, descriptor);
      ApiCookieAuth()(target, key, descriptor);
    } else {
      // Class
      ApiBearerAuth()(target as any);
      ApiCookieAuth()(target as any);
    }
  };
}

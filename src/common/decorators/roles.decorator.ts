import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@app/enums';
import { ApiExcludeController, ApiExcludeEndpoint } from '@nestjs/swagger';
import { config } from 'dotenv';
import { ApiPrivate } from './api-private.decorator';

config();

export const ROLES_KEY = 'roles';
export function Roles(...roles: UserRole[]): MethodDecorator & ClassDecorator {
  const metadata = SetMetadata(ROLES_KEY, roles);

  // Create a decorator factory function that takes a context parameter
  return (
    target: object,
    key?: string | symbol,
    descriptor: TypedPropertyDescriptor<any> = {},
  ) => {
    // Development environment is allowed to generate admin panel APIs
    const isDev = process.env.NODE_ENV === 'development';
    // Restricted for admins if there are no roles for users and editors
    const isRestricted = !(
      roles.includes(UserRole.User) || roles.includes(UserRole.Editor)
    );
    const isPrivate = !!roles.length;
    // Check if the target is a controller or a method
    if (key) {
      // It's a method, so check if roles include ADMIN and apply ApiExcludeEndpoint
      if (!isDev && isRestricted) {
        ApiExcludeEndpoint()(target, key, descriptor);
      }
      // Private routes are only accessible by authenticated users
      if (isPrivate) ApiPrivate()(target, key, descriptor);

      // Apply the metadata
      metadata(target, key, descriptor);
    } else {
      // It's a class (controller), so check if roles include ADMIN and apply ApiExcludeController
      if (!isDev && isRestricted) {
        ApiExcludeController()(target as any);
      }
      if (isPrivate) ApiPrivate()(target as any);

      // Apply the metadata to the whole controller
      metadata(target as any);
    }
  };
}

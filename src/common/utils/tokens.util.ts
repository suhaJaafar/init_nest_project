import { CookieOptions, Request, Response } from 'express';
import {
  // ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@app/constants';
import { Users } from '../../users/entities/users.entity';
import { HeaderAcceptOptions, UserRole } from '@app/enums';
import { ForbiddenException, Logger } from '@nestjs/common';
// import { AuthTokensDto } from '@app/dto/auth-tokens.dto';

export function returnTokensInPreferredFormat(
  accept: HeaderAcceptOptions,
  // tokens: AuthTokensDto,
  response: Response,
): Response {
  // Return response as JSON when requested
  // if (accept === HeaderAcceptOptions.JSON) return response.json(tokens).end();

  const cookieOptions: CookieOptions = {
    httpOnly: true,
    signed: true,
    secure: true,
    sameSite: 'none',
  };
  // response.cookie(ACCESS_TOKEN_COOKIE_NAME, tokens.accessToken, cookieOptions);
  response.cookie(
    REFRESH_TOKEN_COOKIE_NAME,
    // tokens.refreshToken,
    cookieOptions,
  );
  response.header('SameSite', 'none');
  return response.end();
}

const restrictionLogger = new Logger('Restrict user access to roles');

export function restrictUserAccessToRoles(
  users: Users,
  restrictToRoles?: UserRole[],
): void {
  if (
    restrictToRoles &&
    !users.roles.some((r) => restrictToRoles.includes(r))
  ) {
    restrictionLogger.log(users.roles, restrictToRoles);
    throw new ForbiddenException('Access denied! Contact administrator');
  }
  return;
}

export function getRestrictedRoles(
  request: Request,
  adminPanelURL: string,
): UserRole[] | undefined {
  const isAdminPanel = request.headers['origin'] === adminPanelURL;

  if (isAdminPanel) return [UserRole.Admin];
  return undefined;
}

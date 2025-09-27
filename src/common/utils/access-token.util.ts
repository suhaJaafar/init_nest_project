import { Request } from 'express';
import { ACCESS_TOKEN_COOKIE_NAME } from '@app/constants';

export function extractTokenFromHeader(request: Request): string | undefined {
  const [, token] = request.headers.authorization?.split(' ') ?? [];
  return token;
}

export function extractTokenFromCookie(request: Request): string | undefined {
  if (!request.signedCookies) return undefined;
  const accessToken = request.signedCookies[ACCESS_TOKEN_COOKIE_NAME];
  try {
    return accessToken;
  } catch (_) {
    // Do nothing
  }
  return undefined;
}

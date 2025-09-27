import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY, WS_REQUEST_USER_KEY } from '@app/constants';
import { UserRole } from '@app/enums';

// export const ActiveUser = createParamDecorator(
//   (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     const user: ActiveUserData | undefined = request[REQUEST_USER_KEY];
//     return field ? user?.[field] : user;
//   },
// );
export const ActiveUser = createParamDecorator(
  (
    field: keyof ActiveUserData | undefined,
    ctx: ExecutionContext,
  ): ActiveUserData | string | UserRole[] | undefined => {
    const isHttp = ctx.getType() === 'http';
    const isWs = ctx.getType() === 'ws';

    if (isHttp) {
      return handleHttp(ctx, field);
    } else if (isWs) {
      return handleWs(ctx, field);
    }

    // If the context type is neither HTTP nor WebSocket, return undefined
    return undefined;
  },
);

const handleHttp = (
  ctx: ExecutionContext,
  field: keyof ActiveUserData | undefined,
): ActiveUserData | string | UserRole[] | undefined => {
  const request = ctx.switchToHttp().getRequest();
  const user: ActiveUserData | undefined = request[REQUEST_USER_KEY];

  if (field) return user?.[field] as string | undefined | UserRole[];
  return user as ActiveUserData | undefined;
};

const handleWs = (
  ctx: ExecutionContext,
  field: keyof ActiveUserData | undefined,
): ActiveUserData | string | UserRole[] | undefined => {
  const socketServer = ctx.switchToWs().getClient();
  const user: ActiveUserData | undefined =
    socketServer.getData()[WS_REQUEST_USER_KEY];

  if (field) return user?.[field] as string | undefined | UserRole[];
  return user as ActiveUserData | undefined;
};

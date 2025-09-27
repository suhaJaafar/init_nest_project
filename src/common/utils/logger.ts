import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const isDevelopment = process.env.NODE_ENV === 'development';

export const AppLogger = WinstonModule.createLogger({
  levels: winston.config.npm.levels,
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      level: isDevelopment ? 'debug' : 'http',
      format: winston.format.combine(
        winston.format((info) => {
          const hasNoStack = !info.stack;
          const hasEmptyStack =
            Array.isArray(info.stack) && !info.stack.filter(Boolean).length;
          if (hasNoStack || hasEmptyStack) {
            delete info.stack;
          }
          const { level, context, ...rest } = info;
          const isHttp = context === 'HTTP';
          if (!isHttp) {
            return {
              level,
              context,
              message: info.message,
            };
          }
          let message = `${rest.method} ${rest.url} ${rest.statusCode} | User Agent: ${rest.userAgent}`;
          if (isDevelopment) {
            if (rest.requestBody) {
              message += ` | Request Body: ${JSON.stringify(rest.requestBody)}`;
            }
            if (rest.responseBody) {
              message += ` | Response Body: ${JSON.stringify(rest.responseBody)}`;
            }
            if (rest.filesReport) {
              message += ` | Files: ${JSON.stringify(rest.filesReport)}`;
            }
            return { level, context, message };
          }
          return { ...rest, level, context, message };
        })(),
        winston.format.timestamp(),
        isDevelopment
          ? utilities.format.nestLike('Tawasl')
          : winston.format.json(),
      ),
    }),
  ],
});

import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  ValidationPipe,
  VERSION_NEUTRAL,
  VersioningType,
} from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { GenericValidationError } from '@app/dto/validation-error.dto';
import * as basicAuth from 'express-basic-auth';
// import * as fs from 'fs';
// import * as hbs from 'handlebars';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as configureMemoryStore from 'memorystore';
import { ConfigService } from '@nestjs/config';
import { ValidationConstraint, ValidationPropertyPlace } from '@app/enums';
import { setupSwagger } from './configs';
import * as session from 'express-session';
import { AppLogger } from './common/utils/logger';
import * as cookieParser from 'cookie-parser';

const MemoryStore = configureMemoryStore(session);

// const isDevelopment = process.env.NODE_ENV === 'development';
// const isStaging = process.env.NODE_ENV === 'staging';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: AppLogger,
    // httpsOptions: isDevelopment || isStaging,
  });
  const config = app.get(ConfigService);
  app.setGlobalPrefix('api');

  app.use(cookieParser(config.getOrThrow('JWT_SECRET')));
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.use(
    session({
      secret: config.getOrThrow('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 86400000 },
      store: new MemoryStore({
        // Prune expired entries every 24h
        checkPeriod: 86400000,
      }),
    }),
  );

  // const layoutPartial = fs.readFileSync(
  //   `${__dirname}/../templates/layout.hbs`,
  //   {
  //     encoding: 'utf-8',
  //   },
  // );
  // hbs.registerPartial('layout', layoutPartial);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const enhancedErrors: GenericValidationError<any>[] = errors.map(
          (err) => {
            return {
              property: err.property,
              propertyPlace: ValidationPropertyPlace.Body,
              message: Object.values(err.constraints ?? {})[0],
              constraint: Object.keys(
                err.constraints ?? {},
              )[0] as ValidationConstraint,
            };
          },
        );
        return new BadRequestException(enhancedErrors, 'VALIDATION_ERROR');
      },
    }),
  );

  app.use(
    '/api/swagger',
    basicAuth({
      challenge: true,
      users: {
        admin: process.env.SWAGGER_UI_PASSWORD ?? 'admin',
      },
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
    prefix: 'v',
  });

  setupSwagger(app);

  await app.listen(config.get('PORT') || 8080);
}

bootstrap().catch(console.error);

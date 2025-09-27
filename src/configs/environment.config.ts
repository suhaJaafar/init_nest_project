import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().default('development'),
  PORT: Joi.number().default(3001),
  // URLs
  PLATFORM_FRONTEND: Joi.string().required(),
  PLATFORM_BACKEND: Joi.string().required(),
  PLATFORM_ADMIN_PANEL: Joi.string().required(),
  // Postgres
  DATABASE_URL: Joi.string().uri().optional(),
  DATABASE_NAME: Joi.string().optional(),
  DATABASE_USER: Joi.string().optional(),
  DATABASE_PASSWORD: Joi.string().optional(),
  DATABASE_PORT: Joi.number().optional(),
  DATABASE_HOST: Joi.string().optional(),
  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().optional(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.string().required(),
  JWT_REFRESH_TOKEN_TTL: Joi.string().required(),
  // Admin
  SUPER_USERS: Joi.string().required(),
  // Session
  SESSION_SECRET: Joi.string().required(),
  // Swagger UI
  SWAGGER_UI_PASSWORD: Joi.string().required(),
});

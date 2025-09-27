import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function typeORMFactory(config: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: config.getOrThrow('DATABASE_HOST'),
    port: +config.getOrThrow('DATABASE_PORT'),
    username: config.getOrThrow('DATABASE_USER'),
    password: config.getOrThrow('DATABASE_PASSWORD'),
    database: config.getOrThrow('DATABASE_NAME'),
    synchronize: false,
    autoLoadEntities: true,
    subscribers: [__dirname + '/subscribers/*.subscriber{.ts,.js}'],
    logging: ['error', 'warn'],
    ssl:
      config.get('DATABASE_SSL') === 'true'
        ? { rejectUnauthorized: false }
        : false,
  };
}

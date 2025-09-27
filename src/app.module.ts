import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMFactory, validationSchema } from './configs';
import { AuthModule } from './auth/auth.module';
import { IamModule } from './iam/iam.module';
import { ProgramsModule } from './programs/programs.module';
import { ImagesModule } from './images/images.module';
import { InitiativesModule } from './initiatives/initiatives.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeORMFactory,
    }),
    AuthModule,
    IamModule,
    ProgramsModule,
    ImagesModule,
    InitiativesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

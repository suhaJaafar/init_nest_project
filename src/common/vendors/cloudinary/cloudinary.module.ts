import { Module } from '@nestjs/common';
import { Cloudinary } from './providers/cloudinary';
import { CloudinaryService } from './services/cloudinary.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ConfigService, Cloudinary, CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}

import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';
import { CLOUDINARY_PROVIDER } from '@app/constants';

export const Cloudinary: Provider = {
  provide: CLOUDINARY_PROVIDER,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return cloudinary.config({
      cloud_name: configService.getOrThrow('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.getOrThrow('CLOUDINARY_API_KEY'),
      api_secret: configService.getOrThrow('CLOUDINARY_API_SECRET'),
    });
  },
};

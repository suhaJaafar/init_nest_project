import { Injectable } from '@nestjs/common';
import { type TransformationOptions, v2 as cloudinary } from 'cloudinary';
import { type Express } from 'express';
import { createReadStream } from 'streamifier';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {}

  uploadFile(
    file: Express.Multer.File | Buffer,
    transformation?: TransformationOptions,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          transformation,
          /**
           * TODO: Moderate uploaded images
           * Moderations to consider
           *  - Web purify for nudity
           *    @see https://cloudinary.com/addons#webpurify
           *  - Perception Point for spyware, malware, etc
           *    @see https://cloudinary.com/addons#perception_point
           *  For adding more than one moderation, separate them with a pipe (|)
           *  @see https://cloudinary.com/documentation/moderate_assets#multiple_moderations
           */
          // moderation: "webpurify|perception_point",
          folder: this.configService.getOrThrow('CLOUDINARY_CLOUD_FOLDER'),
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject('Unable to upload image');
          resolve(result);
        },
      );

      createReadStream(file instanceof Buffer ? file : file.buffer).pipe(
        uploadStream,
      );
    });
  }

  async deleteFile(publicId: string): Promise<CloudinaryResponse> {
    return await cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) throw error;
      if (!result) throw new Error('Unable to delete image');
      return result;
    });
  }

  async deleteFiles(publicIds: string[]): Promise<CloudinaryResponse> {
    return await cloudinary.api.delete_resources(
      publicIds,
      { resource_type: 'image' },
      (error, result) => {
        if (error) throw error;
        if (!result) throw new Error('Unable to delete images');
        return result;
      },
    );
  }
}

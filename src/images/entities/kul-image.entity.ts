import {
  AfterRemove,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ImageOwnerType } from '@app/enums';
import { CloudinaryService } from '@app/vendors/cloudinary';
import { ConfigService } from '@nestjs/config';
import { parseSimpleArray } from '@app/utils';
import { Logger } from '@nestjs/common';
import { Program } from 'src/programs/entities/program.entity';

type Relations = keyof Pick<KulImage, 'program'>;
type PartialRelations = Partial<Pick<KulImage, Relations>>;

// Keep the same name in the database
@Entity({ name: 'image' })
export class KulImage {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: 'integer' })
  id: number;

  @Column()
  @ApiProperty({ example: 'https://path.to/image' })
  url: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Alt text', nullable: true })
  alt?: string;

  @Column({ nullable: true })
  @ApiProperty({ nullable: true })
  publicId?: string;

  @Column({ enum: ImageOwnerType })
  @IsEnum(ImageOwnerType)
  @ApiProperty({ enum: ImageOwnerType })
  ownerType: ImageOwnerType;

  @Column({ type: 'simple-array', nullable: true })
  @Transform(parseSimpleArray)
  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ type: String, isArray: true, nullable: true })
  keywords?: string[];

  @DeleteDateColumn({ default: null })
  deletedAt: Date | null;

  @OneToOne(() => Program, (program) => program.image, {
    nullable: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  program?: Program;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  /** Creates an instance of an Image entity. */
  static create(
    newImage: Omit<KulImage, ExcludedEntityFields | Relations> &
      PartialRelations,
  ): KulImage {
    const image = new KulImage();
    Object.assign(image, newImage);
    return image;
  }

  /** Deletes the image from Cloudinary. */
  @AfterRemove()
  async cleanup() {
    if (this.publicId) {
      const logger = new Logger(KulImage.name);
      const configService = new ConfigService();
      const cloudinaryService = new CloudinaryService(configService);

      try {
        await cloudinaryService.deleteFile(this.publicId);
        logger.log(`Image deleted from Cloudinary: ${this.publicId}`);
      } catch (error) {
        logger.error(`Error deleting image from Cloudinary: ${error}`);
      }
    }
  }
}

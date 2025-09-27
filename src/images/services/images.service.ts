import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UpdateImageDto } from '@app/dto/update-image.dto';
import { KulImage } from '@app/entities/kul-image.entity';
import { CloudinaryService } from '@app/vendors/cloudinary';
import { CreateImageDto, CreateImagesDto } from '@app/dto/create-image.dto';
import {
  FindImagesQueryDto,
  FindManyImagesDto,
} from '@app/dto/find-images-query.dto';
import { getPaginationResult } from '@app/utils';
import { DbTransactionService } from '@app/services/db-transaction.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(KulImage)
    private readonly repo: Repository<KulImage>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly dbTransactionService: DbTransactionService,
  ) {}

  async findAll(params: FindImagesQueryDto): Promise<FindManyImagesDto> {
    const { offset = 0, limit = 10 } = params;

    const [data, total] = await getPaginationResult<KulImage>({
      repo: this.repo,
      params,
      queryFields: ['keywords', 'alt'],
      filters: {
        ownerType: params.ownerType,
      },
    });

    return { data, total, offset, limit };
  }

  findOneById(
    id: number,
    options?: FindOneOptions<KulImage>,
  ): Promise<KulImage | null> {
    return this.repo.findOne({
      ...options,
      where: { id, ...options?.where },
    });
  }

  async create(createImageDto: CreateImageDto): Promise<KulImage> {
    const { file, ...rest } = createImageDto;
    const { public_id, secure_url } =
      await this.cloudinaryService.uploadFile(file);
    const image = this.repo.create({
      url: secure_url,
      publicId: public_id,
      ...rest,
    });
    return this.repo.save(image);
  }

  async createMultiple(createImagesDto: CreateImagesDto): Promise<KulImage[]> {
    const { files, ...rest } = createImagesDto;
    const images: KulImage[] = [];
    try {
      for (const file of files) {
        const uploadedImage = await this.cloudinaryService.uploadFile(file);
        images.push(
          KulImage.create({
            url: uploadedImage.secure_url,
            publicId: uploadedImage.public_id,
            ...rest,
          }),
        );
      }
    } catch (_) {
      if (images.length) {
        const publicIds = images.map((image) => image.publicId!);
        await this.removeUploadedFiles(publicIds);
      }
    }
    return this.repo.save(images);
  }

  async update(id: number, updateImageDto: UpdateImageDto): Promise<KulImage> {
    const image = await this.repo.findOneBy({ id });
    if (!image) throw new NotFoundException();
    const updatedImage = this.repo.merge(image, updateImageDto);
    return this.repo.save(updatedImage);
  }

  async remove(id: number): Promise<void> {
    const image = await this.repo.findOneBy({ id });
    if (!image) throw new NotFoundException();
    await this.repo.remove(image);
    return;
  }

  async removeUploadedFiles(publicIds: string[]): Promise<void> {
    try {
      await this.cloudinaryService.deleteFiles(publicIds);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}

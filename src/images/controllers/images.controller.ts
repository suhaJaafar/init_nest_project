import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ImagesService } from '@app/services/images.service';
import { KulImage } from '@app/entities/kul-image.entity';
import { AuthType, Tag, UserRole } from '@app/enums';
import { UpdateImageDto } from '@app/dto/update-image.dto';
import {
  FindImagesQueryDto,
  FindManyImagesDto,
} from '@app/dto/find-images-query.dto';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ParseIntGenericPipe } from '@app/pipes';

@Controller('images')
@ApiTags(Tag.Images)
@Auth(AuthType.Bearer)
// @ApiInternalServerError()
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Patch('by-id/:id')
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: 'Update image by ID',
    operationId: 'updateImageById',
  })
  @ApiParam({ name: 'id', type: 'integer' })
  @ApiBody({ type: UpdateImageDto })
  @ApiOkResponse({ type: KulImage })
  updateImageById(
    @Param('id', ParseIntGenericPipe) id: number,
    @Body() updateImageDto: UpdateImageDto,
  ) {
    return this.imagesService.update(id, updateImageDto);
  }

  @Get()
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: 'Get all images', operationId: 'getImages' })
  @ApiOkResponse({ type: FindManyImagesDto })
  getImages(@Query() params: FindImagesQueryDto) {
    return this.imagesService.findAll(params);
  }

  @Get('by-id/:id')
  @Roles(UserRole.Admin)
  @ApiOperation({ summary: 'Get image by ID', operationId: 'getImageById' })
  @ApiParam({ name: 'id', type: 'integer' })
  @ApiOkResponse({ type: KulImage })
  async getImageById(@Param('id', ParseIntGenericPipe) id: number) {
    const image = await this.imagesService.findOneById(id);
    if (!image) throw new NotFoundException();
    return image;
  }

  @Delete('by-id/:id')
  @Roles(UserRole.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete image by ID',
    operationId: 'removeImageById',
  })
  @ApiParam({ name: 'id', type: 'integer' })
  async removeImageById(
    @Param('id', ParseIntGenericPipe) id: number,
  ): Promise<void> {
    await this.imagesService.remove(id);
    return;
  }
}

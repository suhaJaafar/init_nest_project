import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImagesService } from "@app/services/images.service";
import { KulImage } from "@app/entities/kul-image.entity";
import { CloudinaryModule } from "@app/vendors/cloudinary";
import { ImagesController } from "./controllers/images.controller";
import { DbTransactionService } from "@app/services/db-transaction.service";

@Module({
  imports: [TypeOrmModule.forFeature([KulImage]), CloudinaryModule],
  controllers: [ImagesController],
  providers: [ImagesService, DbTransactionService],
  exports: [ImagesService],
})
export class ImagesModule {}

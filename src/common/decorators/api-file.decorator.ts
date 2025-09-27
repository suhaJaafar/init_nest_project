import { ApiBody, ApiConsumes, ApiProperty } from "@nestjs/swagger";

interface ApiFileOptions {
  description?: string;
  required?: boolean;
}

export const ApiFile =
  ({ description, required }: ApiFileOptions): MethodDecorator =>
  (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    class FileUploadDto {
      @ApiProperty({
        type: "string",
        format: "binary",
        description: description ?? "File to upload",
      })
      file: Express.Multer.File;
    }

    ApiConsumes("multipart/form-data")(target, propertyKey, descriptor);
    ApiBody({ type: FileUploadDto })(target, propertyKey, descriptor);
    ApiBody({
      type: "multipart/form-data",
      schema: {
        type: "object",
        properties: {
          file: {
            type: "string",
            format: "binary",
            description,
          },
        },
        required: [required ? "file" : ""].filter(Boolean),
      },
    })(target, propertyKey, descriptor);
  };

export const ApiFiles =
  ({ description, required }: ApiFileOptions): MethodDecorator =>
  (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    class FileUploadDto {
      @ApiProperty({
        type: "array",
        items: {
          type: "string",
          format: "binary",
        },
        description: description ?? "Files to upload",
      })
      files: Express.Multer.File[];
    }

    ApiConsumes("multipart/form-data")(target, propertyKey, descriptor);
    ApiBody({ type: FileUploadDto })(target, propertyKey, descriptor);
    ApiBody({
      type: "multipart/form-data",
      schema: {
        type: "object",
        properties: {
          files: {
            type: "array",
            items: {
              type: "string",
              format: "binary",
            },
            description,
          },
        },
        required: [required ? "files" : ""].filter(Boolean),
      },
    })(target, propertyKey, descriptor);
  };

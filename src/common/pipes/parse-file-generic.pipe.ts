import { ParseFileOptions, ParseFilePipe, ParseFilePipeBuilder } from "@nestjs/common";
import { supportedImageTypesRegex } from "@app/constants";
import { ValidationConstraint } from "@app/enums";
import { GenericValidationError } from "@app/dto/validation-error.dto";

export class ParseFileGenericPipe extends ParseFilePipe {
  constructor(options?: Omit<ParseFileOptions, "validators">) {
    super();
    return new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: supportedImageTypesRegex })
      .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 }) // 5MB
      .build({
        ...options,
        exceptionFactory: this.exceptionFactory,
      }) as any;
  }

  exceptionFactory = (message: string) => {
    return GenericValidationError.errorFrom({
      property: "file",
      message,
      constraint: ValidationConstraint.IsFile,
    }) as any;
  };
}

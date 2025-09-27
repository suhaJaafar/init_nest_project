import { ApiProperty } from '@nestjs/swagger';
import { ValidationConstraint, ValidationPropertyPlace } from '@app/enums';

interface Options<T> {
  property: keyof T;
  message: string;
  constraint?: ValidationConstraint;
  propertyPlace?: ValidationPropertyPlace;
}

interface ValidationError<T> {
  message: GenericValidationError<T>[];
  error: 'VALIDATION_ERROR';
  statusCode: 400;
}

export class GenericValidationError<T> {
  @ApiProperty({
    description: 'The name of the invalid property',
    example: 'name',
    type: 'string',
  })
  property: keyof T;

  @ApiProperty({
    description: 'The place of the invalid property',
    enum: ValidationPropertyPlace,
    enumName: 'ValidationPropertyPlaceEnum',
    example: ValidationPropertyPlace.Body,
  })
  propertyPlace: ValidationPropertyPlace;

  @ApiProperty({
    description: 'Validation error in English',
    example: 'name must be a string',
  })
  message: string;

  @ApiProperty({
    description: 'The validation constraint causing the error',
    enum: ValidationConstraint,
    enumName: 'ValidationConstraintEnum',
    example: ValidationConstraint.IsString,
  })
  constraint: ValidationConstraint;

  constructor({
    property,
    message,
    propertyPlace = ValidationPropertyPlace.Body,
    constraint = ValidationConstraint.IsValid,
  }: Options<T>) {
    this.property = property;
    this.message = message;
    this.constraint = constraint;
    this.propertyPlace = propertyPlace;
  }

  static errorFrom<K>(instances: Options<K>[]): ValidationError<K>;
  static errorFrom<K>(instance: Options<K>): ValidationError<K>;
  static errorFrom<K>(options: Options<K> | Options<K>[]): ValidationError<K> {
    if (Array.isArray(options)) {
      return {
        message: options.map((o) => new GenericValidationError<K>(o)),
        error: 'VALIDATION_ERROR',
        statusCode: 400,
      };
    } else {
      return {
        message: [new GenericValidationError<K>(options)],
        error: 'VALIDATION_ERROR',
        statusCode: 400,
      };
    }
  }
}

export class ValidationErrorDto<T> implements GenericError {
  @ApiProperty({
    type: [GenericValidationError],
    description: 'An array of validation errors',
  })
  message: GenericValidationError<T>[];

  @ApiProperty({
    description: 'The error details',
    nullable: true,
  })
  error?: string;

  @ApiProperty({
    default: 400,
    description: 'The HTTP status code',
    type: 'integer',
  })
  statusCode: number;
}

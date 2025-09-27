import { ConflictException, Logger } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { GenericValidationError } from '@app/dto/validation-error.dto';
import { ValidationConstraint } from '@app/enums';

const logger = new Logger('Conflict Boundary');

export function conflictBoundary(error: any) {
  const pgUniqueViolationCode = '23505';
  if (error?.code === pgUniqueViolationCode) {
    logger.error(error);
    throw new ConflictException();
  }
}

export function intOutOfRangeBoundary(error: any) {
  const pgIntOutOfRangeCode = '22003';
  if (error?.code === pgIntOutOfRangeCode) {
    logger.error(error);
    throw GenericValidationError.errorFrom({
      property: extractPropertyFromDBError(error),
      message: error.message,
      constraint: ValidationConstraint.IsAllowed,
    });
  }
}

function extractPropertyFromDBError(error: QueryFailedError): string {
  const query = error.query;
  const errorMessage = error.driverError.message;
  // Get the number of parameter (e.g. $2)
  const paramNumber = errorMessage.match(/\$\d+/)?.[0];
  // Find the parameter name by the number (e.g. `"price" = $1`)
  const paramName = query.match(`(\\"\\w+\\" = \\${paramNumber})`)?.[0];
  // Extract the property name from the parameter name (e.g. "price")
  return paramName?.split(' = ')[0] ?? '';
}

import { Paramtype } from '@nestjs/common';
import { ValidationPropertyPlace } from '@app/enums';

export function getPropertyPlace(type: Paramtype): ValidationPropertyPlace {
  switch (type) {
    case 'param':
      return ValidationPropertyPlace.Params;
    case 'query':
      return ValidationPropertyPlace.Query;
    case 'body':
      return ValidationPropertyPlace.Body;
    case 'custom':
      return ValidationPropertyPlace.Headers;
  }
}

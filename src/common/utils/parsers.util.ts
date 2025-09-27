interface TransformParams {
  value: any;
}

export function parseStringInt({ value }: TransformParams): any {
  if (value === undefined || value === null) return null;
  let parsedValue: number | undefined | null;
  try {
    parsedValue = JSON.parse(value) as number;
  } catch (_) {
    // Do nothing
  }
  if (typeof value === 'string' && value.length !== String(parsedValue).length)
    return value;
  if (parsedValue === null) return null;
  if (parsedValue === undefined) return undefined;
  if (isNaN(parsedValue)) return value;
  return parsedValue;
}

export function parseStringIntArray({
  value,
}: TransformParams): undefined | null | number[] {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (Array.isArray(value)) return value.map((v) => parseInt(v, 10));
  if (typeof value === 'number') return [value];
  return [parseInt(value, 10)];
}

export function parseStringBoolean({ value }: TransformParams) {
  switch (true) {
    case typeof value === 'boolean':
      return value;
    case typeof value === 'string':
      if (value === 'true') return true;
      if (value === 'false') return false;
      else return value;
    default:
      return value;
  }
}

export function parseStringDate({ value }: TransformParams) {
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date;
}

export function parseUserRoles({ value }: TransformParams) {
  if (typeof value === 'string') {
    return [value];
  } else if (Array.isArray(value)) {
    if (value.every((v) => typeof v === 'string')) {
      return value;
    }
  }
  return value;
}

export function parseSimpleArray({ value }: TransformParams) {
  if (typeof value === 'string') return value.split(',');
  else if (Array.isArray(value)) return value;
  else return [];
}

export function parseStringJson({ value }: TransformParams) {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (_) {
      return {
        // Do nothing
      };
    }
  } else if (typeof value === 'object') return value;
  else return {};
}

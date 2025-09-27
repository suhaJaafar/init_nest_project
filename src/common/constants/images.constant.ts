export const SUPPORTED_IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'svg', 'webp'];
export const supportedImageTypesRegex = new RegExp(
  SUPPORTED_IMAGE_TYPES.join('|'),
  'i',
);

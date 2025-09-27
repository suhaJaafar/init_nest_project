type UploadApiErrorResponse = import('cloudinary').UploadApiErrorResponse;
type UploadApiResponse = import('cloudinary').UploadApiResponse;

declare type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

declare interface CloudinaryImage {
  asset_id: string;
  public_id: string;
  folder: string;
  filename: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  uploaded_at: string;
  bytes: number;
  backup_bytes: number;
  width: number;
  height: number;
  aspect_ratio: number;
  pixels: number;
  url: string;
  secure_url: string;
  status: string;
  access_mode: string;
  access_control: any;
  etag: string;
  created_by: {
    access_key: string;
    custom_id: string;
    external_id: string;
  };
  uploaded_by: {
    access_key: string;
    custom_id: string;
    external_id: string;
  };
  last_updated: {
    tags_updated_at: string;
    updated_at: string;
  };
}

declare interface CloudinarySearchResponse {
  total_count: number;
  time: number;
  resources: CloudinaryImage[];
  rate_limit_allowed: number;
  rate_limit_reset_at: string;
  rate_limit_remaining: number;
}

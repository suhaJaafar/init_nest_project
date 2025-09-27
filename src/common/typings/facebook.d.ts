declare interface FBPublicProfileResponse {
  id: string;
  name: string;
  first_name?: string;
  last_name?: string;
  gender?: 'male' | 'female';
  email?: string;
  picture?: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
}

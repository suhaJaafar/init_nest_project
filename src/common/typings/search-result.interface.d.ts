declare interface SearchResultShopInterface {
  objectID: string;
  name: string;
  description: string;
  bio: string;
}

declare interface SearchResultServiceInterface {
  objectID: number;
  name: string;
  description: string;
  summary: string;
}

declare interface SearchResultBundleInterface {
  objectID: number;
  name: string;
  description: string;
  price: number;
}

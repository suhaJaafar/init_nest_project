interface ICommon {
  objectID: string;
}

declare interface IEntityIndex extends ICommon {
  active: boolean;
  _geoloc: {
    lat: number;
    lng: number;
  };
}

declare interface IShopIndex extends IEntityIndex {
  name: string;
  description: string;
  bio: string;
}

declare interface IServiceIndex extends IEntityIndex {
  name: service.name;
  description: service.description;
  summary: service.summary;
}

declare interface IBundleIndex extends IEntityIndex {
  name: bundle.name;
  description: bundle.description;
  price: bundle.price;
}

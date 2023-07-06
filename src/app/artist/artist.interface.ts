export interface IGetArtists {
  artists: IArtists;
}

export interface IArtists {
  href: string;
  items: IArtistsDetails[];
  limit: number;
  next: string;
  offset: number;
  previous: any;
  total: number;
}

export interface IArtistsDetails {
  external_urls: IExternalUrls;
  followers: IFollowers;
  genres: string[];
  href: string;
  id: string;
  images: IImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface IExternalUrls {
  spotify: string;
}

export interface IFollowers {
  href: any;
  total: number;
}

export interface IImage {
  height: number;
  url: string;
  width: number;
}

export interface IRefactoredArtistsDetails {
  image: IImage;
  name: string;
  albumsUrl: string;
  followers: number;
  stars: number;
}

export interface CreateFilmDtoType {
  title: string;
  openingCrawl: string;
  director: string;
  producer: string;
  url: string;
  releaseDate: Date;
}

export interface FilmType extends CreateFilmDtoType {
  id: number;
  created: Date;
  edited: Date;
}

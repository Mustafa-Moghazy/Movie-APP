export interface Movie {
  id?: number;
  imdbID: string;
  title: string;
  year: string;
  type: string;
  poster: string;
}

export interface MovieDto {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// apps/frontend/src/domain/dtos/movie.dto.ts

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number; // Changed to number based on API example
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null; // Changed to poster_path
  release_date: string; // Changed to release_date
  title: string; // Localized title
  video: boolean;
  vote_average: number;
  vote_count: number;
}

import { MovieRepository } from '@/data/movie.repository';
import { Movie } from './dtos/movie.dto'; 
/**
 * MovieService handles business logic related to movies.
 * It interacts with the MovieRepository.
 */
export class MovieService {
    private movieRepository: MovieRepository;

    constructor() {
        this.movieRepository = new MovieRepository();
    }

    /**
     * Fetches popular movies.
     * @param page - The page number for pagination.
     * @param language - The language code for localization.
     * @returns A promise that resolves to the list of popular movies.
     */
    async getPopularMovies(page: number = 1, language: string = 'th-TH'): Promise<Movie[]> {
        return this.movieRepository.popular(page, language);
    }
    /**
     * Fetches top-rated movies.
     * @param page - The page number for pagination.
     * @param language - The language code for localization.
     * @returns A promise that resolves to the list of top-rated movies.
     */
    async getTopRatedMovies(page: number = 1, language: string = 'th-TH'): Promise<Movie[]> {
        return this.movieRepository.topRated(page, language);
    }
    /**
     * Searches for movies based on a query.
     * @param query - The search query.
     * @param page - The page number for pagination.
     * @param language - The language code for localization.
     * @returns A promise that resolves to the list of movies matching the search query.
     */
    async searchMovies(query: string, page: number = 1, language: string = 'th-TH'): Promise<Movie[]> {
        return this.movieRepository.search(query, page, language);
    }
    /**
     * Fetches details of a specific movie.
     * @param movieId - The ID of the movie.
     * @param language - The language code for localization.
     * @returns A promise that resolves to the movie details.
     */
    async getMovieDetails(movieId: string, language: string = 'th-TH'): Promise<Movie> {
        return this.movieRepository.details(movieId, language);
    }

    /**
     * Fetches upcoming movies.
     * @param page - The page number for pagination.
     * @param language - The language code for localization.
     * @returns A promise that resolves to the list of upcoming movies.
     */
    async getUpcomingMovies(page: number = 1, language: string = 'th-TH'): Promise<Movie[]> {
        return this.movieRepository.upcoming(page, language);
    }

    /**
     * Fetches now playing movies.
     * @param page - The page number for pagination.
     * @param language - The language code for localization.
     * @returns A promise that resolves to the list of now playing movies.
     */
    async getNowPlayingMovies(page: number = 1, language: string = 'th-TH'): Promise<Movie[]> {
        return this.movieRepository.nowPlaying(page, language);
    }
}
// apps/frontend/src/data/movie.repository.ts
import { Movie, MovieDetails } from '@/domain/dtos/movie.dto'; 
export class MovieRepository {
    async popular(page: number = 1, language: string = 'th-TH'): Promise<Movie[]> {
        const response = await fetch(`/api/movies/popular?page=${page}&language=${language}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch popular movies');
        }

        const result = await response.json();
        console.log('MovieRepository - popular API Response:', result);
        return result.results;
    }

    async topRated(page: number = 1, language: string = 'th-TH'): Promise<Movie[]> {
        const response = await fetch(`/api/movies/top-rated?page=${page}&language=${language}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch top-rated movies');
        }

        const result = await response.json();
        console.log('MovieRepository - topRated API Response:', result);
        return result.results;
    }

    async upcoming(page: number = 1, language: string = 'th-TH'): Promise<Movie[]> {
        const response = await fetch(`/api/movies/upcoming?page=${page}&language=${language}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch upcoming movies');
        }

        const result = await response.json();
        console.log('MovieRepository - upcoming API Response:', result);
        return result.results;
    }

    async nowPlaying(page: number = 1, language: string = 'th-TH'): Promise<Movie[]> {
        const response = await fetch(`/api/movies/now-playing?page=${page}&language=${language}`, {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch now playing movies');
        }
        const result = await response.json();
        console.log('MovieRepository - nowPlaying API Response:', result);
        return result.results;
    }

    async search(query: string, page: number = 1, language: string = 'th-TH'): Promise<Movie[]> {
        const response = await fetch(`/api/movies/search?query=${encodeURIComponent(query)}&page=${page}&language=${language}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to search movies');
        }

        const result = await response.json();
        console.log('MovieRepository - search API Response:', result);
        return result.results;
    }

    async details(movieId: number, language: string = 'th-TH'): Promise<MovieDetails> {
        const response = await fetch(`/api/movies/${movieId}?language=${language}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch movie details');
        }

        const result = await response.json();
        console.log('MovieRepository - details API Response:', result);
        return result;
    }
}
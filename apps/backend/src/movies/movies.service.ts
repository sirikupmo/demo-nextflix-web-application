// src/movies/movies.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieApiRepository } from '../data/movies.repository'; // This is from the Data Layer

@Injectable()
export class MoviesService {
    constructor(private readonly MovieApiRepository: MovieApiRepository) { }

    async searchAll(query: string, page: number, language: string, user?: any): Promise<any | null> {
        if (user) {
            console.log(`User searching movies: ${user.email} (ID: ${user.userId})`);
        }
        const apiResponse = await this.MovieApiRepository.searchAll(query, page, language);
        return apiResponse;
    }

    async getPopularMovies(page: number, language: string, user?: any): Promise<any | null> {
        if (user) {
            console.log(`Fetching popular movies for user: ${user.email} (ID: ${user.userId})`);
        }
        const apiResponse = await this.MovieApiRepository.fetchPopularMovies(page, language);
        return apiResponse;
    }

    async getTopRateMovies(page: number, language: string, user?: any): Promise<any | null> {
        if (user) {
            console.log(`Fetching top-rated movies for user: ${user.email} (ID: ${user.userId})`);
        }
        const apiResponse = await this.MovieApiRepository.fetchTopRatedMovies(page, language);
        return apiResponse;
    }

    async getUpcomingMovies(page: number, language: string, user?: any): Promise<any | null> {
        if (user) {
            console.log(`Fetching upcoming movies for user: ${user.email} (ID: ${user.userId})`);
        }
        const apiResponse = await this.MovieApiRepository.fetchUpcomingMovies(page, language);
        return apiResponse;
    }

    async getNowPlayingMovies(page: number, language: string, user?: any): Promise<any | null> {
        if (user) {
            console.log(`Fetching now playing movies for user: ${user.email} (ID: ${user.userId})`);
        }
        const apiResponse = await this.MovieApiRepository.fetchNowPlayingMovies(page, language);
        return apiResponse;
    }
}
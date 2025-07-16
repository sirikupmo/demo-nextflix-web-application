// src/movies/movies.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { FreeMovieApiRepository } from '../data/movies.repository'; // This is from the Data Layer

@Injectable()
export class MoviesService {
    constructor(private readonly freeMovieApiRepository: FreeMovieApiRepository) { }

    async getPopularMovies(page: number, language: string): Promise<any | null> {
        const apiResponse = await this.freeMovieApiRepository.fetchPopularMovies(page, language);
        // Perform data transformation from API response to your Movie entity
        return apiResponse;
    }
}
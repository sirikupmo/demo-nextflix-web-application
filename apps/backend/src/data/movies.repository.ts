// src/data/movies.repository.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class MovieApiRepository {
  private readonly API_BASE_URL = process.env.TMDB_URL; // Example Free Movie API
  private readonly API_ACCESS_TOKEN = process.env.TMDB_TOKEN; // Replace with your actual API key

  constructor(private readonly httpService: HttpService) {}

  async fetchPopularMovies(page: number = 1, language: string = 'en-US'): Promise<any> {
    const url = `${this.API_BASE_URL}/movie/popular`;
    
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            language,
            page,
          },
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${this.API_ACCESS_TOKEN}`,
          },
        }),
      );

      return response.data;
    } catch (error) {
      // Handle errors appropriately
      console.error('Error fetching popular movies:', error);
      throw new Error('Failed to fetch popular movies');
    }
  }
}
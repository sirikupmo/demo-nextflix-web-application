// src/data/movies.repository.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class MovieApiRepository {
  private readonly API_BASE_URL = process.env.TMDB_URL; // Example Free Movie API
  private readonly API_ACCESS_TOKEN = process.env.TMDB_TOKEN; // Replace with your actual API key

  constructor(private readonly httpService: HttpService) {}

  async searchAll(query: string, page: number = 1): Promise<any> {
    const url = `${this.API_BASE_URL}/search/keyword`;
    
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            query,
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
      console.error('Error searching movies:', error);
      throw new Error('Failed to search movies');
    }
  }

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

  async fetchTopRatedMovies(page: number = 1, language: string = 'en-US'): Promise<any> {
    const url = `${this.API_BASE_URL}/movie/top_rated`;
    
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
      console.error('Error fetching top-rated movies:', error);
      throw new Error('Failed to fetch top-rated movies');
    }
  }

  async fetchUpcomingMovies(page: number = 1, language: string = 'en-US'): Promise<any> {
    const url = `${this.API_BASE_URL}/movie/upcoming`;
    
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
      console.error('Error fetching upcoming movies:', error);
      throw new Error('Failed to fetch upcoming movies');
    }
  }

  async fetchNowPlayingMovies(page: number = 1, language: string = 'en-US'): Promise<any> {
    const url = `${this.API_BASE_URL}/movie/now_playing`;
    
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
      console.error('Error fetching now playing movies:', error);
      throw new Error('Failed to fetch now playing movies');
    }
  }
}
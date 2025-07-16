import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieApiRepository } from '../data/movies.repository'; // This is from the Data Layer
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module'; 
@Module({
    imports: [HttpModule, AuthModule], // Import HttpModule for making HTTP requests and AuthModule for authentication
    controllers: [MoviesController],
    providers: [MoviesService, MovieApiRepository],
})
export class MoviesModule { }
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
// import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MoviesModule
  ],
})
export class AppModule { }

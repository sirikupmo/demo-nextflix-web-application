import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { MoviesModule } from './movies/movies.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ProfileModule,
    MoviesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

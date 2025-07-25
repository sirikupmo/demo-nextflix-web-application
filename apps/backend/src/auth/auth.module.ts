// src/auth/auth.module.ts
import { Module, MiddlewareConsumer, RequestMethod, forwardRef, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from '../data/user.repository';
import { ProfileModule } from '../profile/profile.module';
import { RefreshTokenInterceptor } from './refresh-token.interceptor';
/**
 * AuthModule encapsulates all authentication features.
 * Configures JwtModule, PassportModule, registers AuthController and AuthService,
 * and provides JwtStrategy for token validation.
 */
@Module({
  imports: [
    PassportModule,
    // Configure JwtModule asynchronously to load secret from ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule to use ConfigService
      useFactory: async () => ({
        secret: process.env.JWT_SECRET || 'dev-secret',
      }),
      inject: [ConfigService], // Inject ConfigService into the factory
    }),
    ConfigModule,
    forwardRef(() => ProfileModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserRepository, RefreshTokenInterceptor],
  exports: [AuthService, JwtModule, PassportModule], // Export AuthService and JwtModule if other modules need them
})

export class AuthModule implements NestModule {
  // Remove middleware configuration, as Interceptors are applied via @UseInterceptors()
  configure(consumer: MiddlewareConsumer) {
    // This method can be used for other middleware if needed, but RefreshTokenInterceptor is not applied here.
  }
}
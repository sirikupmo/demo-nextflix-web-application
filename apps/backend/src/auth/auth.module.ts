// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
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
        signOptions: { expiresIn: '60m' }, // Token expiration time
      }),
      inject: [ConfigService], // Inject ConfigService into the factory
    }),
    ConfigModule, // Make sure ConfigModule is imported if you're using it
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule, PassportModule], // Export AuthService and JwtModule if other modules need them
})
export class AuthModule {}
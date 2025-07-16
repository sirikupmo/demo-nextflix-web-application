// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

/**
 * Interface for the JWT payload.
 * Defines the structure of data stored inside the JWT.
 */
export interface JwtPayload {
  email: string;
  sub: string; // User ID
  iat?: number; // Issued at
  exp?: number; // Expiration time
}

/**
 * JwtStrategy is responsible for validating the JWT token.
 * It extracts the token from the Authorization header (Bearer token),
 * verifies it using the secret, and returns the user payload.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from 'Authorization: Bearer <token>'
      ignoreExpiration: false, // Do not ignore token expiration
      secretOrKey: process.env.JWT_SECRET || 'dev-secret', // Use the same secret key as used for signing
    });
  }

  /**
   * Validates the JWT payload.
   * This method is called after the token is successfully verified.
   * @param payload - The decoded JWT payload.
   * @returns The user object to be attached to the request (req.user).
   * @throws UnauthorizedException if the user is not found or invalid.
   */
  async validate(payload: JwtPayload) {
    // In a real application, you might fetch the user from a database here
    // to ensure they still exist and are active.
    // For this example, we just return the payload itself as the user.
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }
    // The returned object will be attached to req.user
    return { userId: payload.sub, email: payload.email };
  }
}
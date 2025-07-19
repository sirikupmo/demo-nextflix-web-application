// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
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
 * Custom JWT extractor function to get token from cookie or Authorization header.
 * @param req - The Express request object.
 * @returns The JWT token string if found, otherwise null.
 */
const jwtExtractor = (req: Request): string | null => {
  let token = null;
  // 1. Try to get token from cookie
  if (req && req.cookies && req.cookies['jwt']) {
    token = req.cookies['jwt']; // 'jwt' is the name of our cookie
    (req as any).tokenExtractedFrom = 'cookie';
    console.log('JWT extracted from cookie:', token, new Date().toLocaleTimeString());
  }
  // 2. If not found in cookie, try Authorization header (Bearer token)
  if (!token && req && req.headers.authorization) {
    const [type, tokenFromHeader] = req.headers.authorization.split(' ');
    if (type === 'Bearer' && tokenFromHeader) {
      token = tokenFromHeader;
      (req as any).tokenExtractedFrom = 'header';
      console.log('JWT extracted from Authorization header:', token, new Date().toLocaleTimeString());
    }
  }
  return token;
};

/**
 * JwtStrategy is responsible for validating the JWT token.
 * It extracts the token from the Authorization header (Bearer token),
 * verifies it using the secret, and returns the user payload.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: jwtExtractor, // Extract token from 'Authorization: Bearer <token>'
      ignoreExpiration: true, // Do not ignore token expiration
      secretOrKey: process.env.JWT_SECRET || 'dev-secret', // Use the same secret key as used for signing
      passReqToCallback: true,
    });
  }

  /**
   * Validates the JWT payload.
   * This method is called after the token is successfully verified.
   * @param payload - The decoded JWT payload.
   * @returns The user object to be attached to the request (req.user).
   * @throws UnauthorizedException if the user is not found or invalid.
   */
  async validate(req: Request, payload: JwtPayload) {
    // In a real application, you might fetch the user from a database here
    // to ensure they still exist and are active.
    const tokenExtractedFrom = (req as any).tokenExtractedFrom;
    const now = Date.now() / 1000; // Current time in seconds
    const isExpired = payload.exp && payload.exp < now;
    if (isExpired) {
      if (tokenExtractedFrom === 'header') {
        // If it's a header token and it's expired, it's truly unauthorized.
        // This enforces the 60m expiry for API clients.
        throw new UnauthorizedException('Token expired for API client.');
      }
      // If it's a cookie token and it's expired, we allow it to pass through
      // so RefreshTokenInterceptor can re-issue a new one (sliding session).
      // We still need to return the user data for the interceptor to use.
      // console.log('JwtStrategy - Expired cookie token allowed for refresh.'); // For debugging
    }
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }
    // The returned object will be attached to req.user
    return { userId: payload.sub, email: payload.email, tokenExtractedFrom: tokenExtractedFrom };
  }
}
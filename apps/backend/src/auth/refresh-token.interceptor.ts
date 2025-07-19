// apps/backend/src/auth/refresh-token.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';
import { Request, Response } from 'express';

/**
 * RefreshTokenInterceptor is responsible for re-issuing a JWT cookie
 * on every successful authenticated request that originated from a web client (via cookie).
 * This implements a sliding session with a 1-hour inactivity timeout.
 *
 * This Interceptor runs AFTER Guards (like JwtAuthGuard), so req.user is available.
 */
@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    // Check if the request was authenticated and the token came from a cookie
    // (req as any).user is set by JwtStrategy
    // (req as any).tokenExtractedFrom is set by JwtStrategy
    if ((req as any).user && (req as any).tokenExtractedFrom === 'cookie') {
      console.log('Old Req Cookie: ', req.cookies)
      console.log('RefreshTokenInterceptor - Valid JWT cookie found, refreshing token.', new Date().toLocaleTimeString());
      return next.handle().pipe(
        tap(() => {
          const userPayload: JwtPayload = {
            email: (req as any).user.email,
            sub: (req as any).user.userId,
          };

          // Re-sign the token with a short expiration (e.g., 15 minutes)
          // This internal JWT expiration is for security, the cookie maxAge controls the session length.
          const newToken = this.jwtService.sign(userPayload, {
            secret: process.env.JWT_SECRET || 'dev-secret',
            expiresIn: process.env.JWT_EXPIRATION_TIME_SHOPT_LIVED || '15m', // Internal JWT expiration (e.g., 15 minutes)
          });

          // Set the new token as an HttpOnly cookie
          // maxAge is 1 hour (60 minutes) to implement the inactivity timeout.
          res.cookie('jwt', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure in production (HTTPS)
            maxAge: process.env.COOKIE_MAX_AGE_MIN ? parseInt(process.env.COOKIE_MAX_AGE_MIN) * 60 * 1000 : 60 * 60 * 1000,  // 1 hour in milliseconds (resets on every valid request)
            sameSite: 'lax', // Protect against CSRF
            path: '/', 
          });
          console.log('JWT cookie refreshed by Interceptor!');
        }),
      );
    } else {
      // If not from cookie or not authenticated, just pass through
      return next.handle();
    }
  }
}